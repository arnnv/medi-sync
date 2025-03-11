import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { getConversation, sendMessage, getImage, ConversationHistory, ConversationMessage } from '../services/api';
import axios, { AxiosError } from 'axios';

const Chat = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<ConversationHistory | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [imageData, setImageData] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) {
      navigate('/');
      return;
    }

    const fetchConversation = async () => {
      setIsFetching(true);
      try {
        const data = await getConversation(conversationId);
        setConversation(data);
        setMessages(data.messages);
        
        // Fetch the image
        const imageResponse = await getImage(conversationId);
        setImageData(imageResponse.image);
      } catch (error) {
        console.error('Error fetching conversation:', error);
        alert('Failed to load conversation. Redirecting to home page.');
        navigate('/');
      } finally {
        setIsFetching(false);
      }
    };

    // If we have data from the state (from the upload), use it
    if (location.state) {
      const initialMessage: ConversationMessage = {
        role: 'assistant',
        content: location.state.message,
      };
      setMessages([initialMessage]);
      
      // Still fetch the conversation to get any other messages
      fetchConversation();
    } else {
      fetchConversation();
    }
  }, [conversationId, navigate, location.state]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    const userMessage: ConversationMessage = {
      role: 'user',
      content: newMessage,
    };

    // Add user message to the UI immediately
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = newMessage.trim();
    setNewMessage('');
    setIsLoading(true);

    try {
      // Validate inputs before sending
      if (!conversationId) {
        throw new Error('Conversation ID is missing');
      }
      
      if (!messageToSend) {
        throw new Error('Message cannot be empty');
      }
      
      console.log('Sending message:', {
        conversationId,
        message: messageToSend
      });
      
      // Send the message to the API
      const response = await sendMessage(conversationId, messageToSend);
      
      // Add assistant response to the UI
      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: response.response,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Format the error message for display
      let errorDisplayMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error instanceof Error) {
        // Extract the actual error message without the "Error: " prefix
        const errorMsg = error.message;
        if (errorMsg.startsWith('Validation error:')) {
          // For validation errors, show a more user-friendly message
          errorDisplayMessage = `Sorry, there was a problem with your message. ${errorMsg.replace('Validation error: ', '')}`;
        } else {
          errorDisplayMessage = `Sorry, I encountered an error: ${errorMsg}. Please try again.`;
        }
      }
      
      // Add error message to the chat
      const errorMessage: ConversationMessage = {
        role: 'assistant',
        content: errorDisplayMessage,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      // More descriptive error message in console
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Axios error details:', {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)]">
      {/* Left side - X-ray image and analysis */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <Button 
          variant="ghost" 
          className="w-fit flex items-center gap-2" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        
        {imageData && (
          <Card className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">X-ray Image</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <img 
                src={`data:image/jpeg;base64,${imageData}`} 
                alt="X-ray" 
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        )}
        
        {conversation && (
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Body Part:</span>{' '}
                  <span className="text-muted-foreground">{conversation.body_part}</span>
                </div>
                <div>
                  <span className="font-medium">Fracture Status:</span>{' '}
                  <span 
                    className={`${
                      conversation.fracture_status.toLowerCase().includes('no fracture') 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}
                  >
                    {conversation.fracture_status}
                  </span>
                </div>
                <div>
                  <span className="font-medium">AI Confirmation:</span>{' '}
                  <span className="text-muted-foreground">
                    {conversation.gemini_confirmation ? 'Confirmed' : 'Not confirmed'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right side - Chat */}
      <div className="w-full md:w-2/3 flex flex-col">
        <Card className="flex-1 flex flex-col h-full">
          <CardHeader className="p-4 border-b">
            <CardTitle>Chat with MediSync Assistant</CardTitle>
            <CardDescription>
              Ask questions about your X-ray analysis results
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className="markdown-content">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !newMessage.trim()}>
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat; 