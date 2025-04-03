
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

export const generateWordDocument = async (text: string, fileName: string = 'document'): Promise<void> => {
  // Create a new document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: text
          .split('\n')
          .map(
            paragraph => new Paragraph({
              text: paragraph.trim(),
              spacing: {
                after: 200,
              },
            })
          ),
      },
    ],
  });

  // Generate a blob from the document
  const blob = await Packer.toBlob(doc);
  
  // Save the blob to a file
  saveAs(blob, `${fileName}.docx`);
};
