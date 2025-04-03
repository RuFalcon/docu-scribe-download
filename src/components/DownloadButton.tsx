
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { generateWordDocument } from '@/utils/docx';
import { toast } from 'sonner';

interface DownloadButtonProps {
  text: string;
  disabled: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ text, disabled }) => {
  const handleDownload = async () => {
    try {
      await generateWordDocument(text, 'DocuScribe-Document');
      toast.success('Document downloaded successfully');
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('Failed to download document. Please try again.');
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled}
      className="w-full"
      size="lg"
    >
      <FileDown className="mr-2 h-5 w-5" />
      Download as Word Document
    </Button>
  );
};

export default DownloadButton;
