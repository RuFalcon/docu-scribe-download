
import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  }, [onFileSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [onFileSelected]);

  const processFile = (file: File) => {
    // Create a preview URL for the image
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelected(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={cn(
        "p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary",
        previewUrl ? "p-4" : "p-10"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={!isProcessing ? triggerFileInput : undefined}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isProcessing}
      />
      
      {previewUrl ? (
        <div className="flex flex-col items-center">
          <img 
            src={previewUrl} 
            alt="Document preview" 
            className="max-h-80 max-w-full rounded-md object-contain mb-4" 
          />
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <svg className="spinner" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500">Processing document...</p>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={triggerFileInput}>
              Upload a different document
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-blue-50 rounded-full">
            <UploadCloud size={48} className="text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-lg">Upload Document</h3>
            <p className="text-sm text-gray-500 mt-1">
              Drag and drop an image file here, or click to select
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: JPG, PNG, BMP, WEBP
            </p>
          </div>
          <Button className="mt-4" disabled={isProcessing}>
            Select Document
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FileUpload;
