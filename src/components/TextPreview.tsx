
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TextPreviewProps {
  text: string;
  isProcessing: boolean;
}

const TextPreview: React.FC<TextPreviewProps> = ({ text, isProcessing }) => {
  // Format the text by maintaining paragraph spacing
  const formattedText = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Extracted Text</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {isProcessing ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Processing...
            </div>
          ) : text ? (
            <div className="text-sm whitespace-pre-wrap">{formattedText}</div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Upload a document to see extracted text here
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TextPreview;
