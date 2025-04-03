
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import TextPreview from '@/components/TextPreview';
import DownloadButton from '@/components/DownloadButton';
import { extractTextFromImage } from '@/utils/ocr';
import { Toaster } from "@/components/ui/sonner";
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessedFile, setHasProcessedFile] = useState(false);

  const handleFileSelected = async (file: File) => {
    setIsProcessing(true);
    setHasProcessedFile(false);
    
    try {
      const text = await extractTextFromImage(file);
      setExtractedText(text);
      setHasProcessedFile(true);
      toast.success('Text extracted successfully');
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Failed to extract text. Please try another image.');
      setExtractedText('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">DocuScribe</h1>
              <p className="text-sm text-muted-foreground">Document Text Extractor</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <h2 className="text-xl font-semibold">Upload Document</h2>
            <FileUpload 
              onFileSelected={handleFileSelected} 
              isProcessing={isProcessing} 
            />
            <div className="md:hidden">
              <TextPreview 
                text={extractedText} 
                isProcessing={isProcessing} 
              />
            </div>
            <DownloadButton 
              text={extractedText} 
              disabled={!hasProcessedFile || isProcessing || !extractedText} 
            />
          </div>
          
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold mb-6">Text Preview</h2>
            <TextPreview 
              text={extractedText} 
              isProcessing={isProcessing} 
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            DocuScribe — Extract text from document images and download as Word files
          </p>
        </div>
      </footer>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
