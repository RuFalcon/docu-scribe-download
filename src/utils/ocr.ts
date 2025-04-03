
import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  try {
    const result = await Tesseract.recognize(
      imageFile,
      'eng', // Language code for English
      {
        logger: (info) => {
          console.log(info);
        }
      }
    );
    
    return result.data.text;
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error('Failed to extract text from image');
  }
};
