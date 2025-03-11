import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface AnalysisResponse {
  conversation_id: string;
  body_part: string;
  fracture_status: string;
  gemini_confirmation: boolean;
  message: string;
}

export interface ChatResponse {
  conversation_id: string;
  response: string;
}

export interface ConversationMessage {
  role: string;
  content: string;
}

export interface ConversationHistory {
  conversation_id: string;
  image_path: string;
  body_part: string;
  fracture_status: string;
  gemini_confirmation: boolean;
  messages: ConversationMessage[];
}

export interface ImageResponse {
  image: string; // base64 encoded image
}

export const analyzeXray = async (file: File): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: false,
  });

  return response.data;
};

export const sendMessage = async (
  conversation_id: string,
  message: string
): Promise<ChatResponse> => {
  // Validate inputs
  if (!conversation_id || !message) {
    throw new Error('conversation_id and message are required');
  }

  // Make sure we're sending the exact format the API expects
  const payload = {
    conversation_id,
    message,
  };

  console.log('Sending message payload:', JSON.stringify(payload, null, 2));
  console.log('API URL:', `${API_URL}/chat`);
  
  try {
    // Use axios directly instead of the api instance
    const response = await axios.post(`${API_URL}/chat`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    });
    
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      
      // Provide more specific error messages based on status code
      if (error.response?.status === 422) {
        const errorData = error.response.data;
        let errorMessage = 'Invalid request format';
        
        // Extract the detail message from the response
        if (errorData) {
          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (typeof errorData === 'object') {
            // Try to extract the message or errors from the object
            if ('message' in errorData) {
              errorMessage = String(errorData.message);
            } else if ('errors' in errorData) {
              try {
                errorMessage = JSON.stringify(errorData.errors);
              } catch (e) {
                errorMessage = 'Validation errors occurred';
              }
            } else {
              // If we can't find specific fields, stringify the whole object
              try {
                errorMessage = JSON.stringify(errorData);
              } catch (e) {
                errorMessage = 'Unknown validation error';
              }
            }
          }
        }
        
        throw new Error(`Validation error: ${errorMessage}`);
      }
    }
    throw error;
  }
};

export const getConversation = async (
  conversation_id: string
): Promise<ConversationHistory> => {
  try {
    const response = await axios.get(`${API_URL}/conversation/${conversation_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching conversation:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }
    throw error;
  }
};

export const getImage = async (
  conversation_id: string
): Promise<ImageResponse> => {
  try {
    const response = await axios.get(`${API_URL}/image/${conversation_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching image:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }
    throw error;
  }
}; 