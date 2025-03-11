import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ImagePlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { analyzeXray } from '../services/api';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await analyzeXray(file);
      navigate(`/chat/${result.conversation_id}`, { state: result });
    } catch (error) {
      console.error('Error analyzing X-ray:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          alert('Error: The uploaded file is not a valid X-ray image or could not be processed.');
        } else if (error.response?.status === 500) {
          alert('Server error: The X-ray analysis service is currently unavailable. Please try again later.');
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          alert('Connection error: Could not connect to the server. Please check if the backend service is running.');
        } else {
          alert(`Failed to analyze X-ray: ${error.message}`);
        }
      } else {
        alert('Failed to analyze X-ray. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          X-ray Analysis with AI
        </h1>
        <p className="text-xl text-muted-foreground">
          Upload your X-ray image for instant analysis and chat with our AI assistant about the results.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload X-ray Image</CardTitle>
          <CardDescription>
            Drag and drop your X-ray image or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border'
            } transition-colors cursor-pointer`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              {file ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <ImagePlus className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG or JPEG (max. 10MB)
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={!file || isUploading}
            onClick={handleUpload}
          >
            {isUploading ? 'Analyzing...' : 'Analyze X-ray'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home; 