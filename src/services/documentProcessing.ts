import { PDFDocumentProxy } from 'pdfjs-dist';
import * as pdfjs from 'pdfjs-dist';
// We'll need to install these packages:
// npm install mammoth tesseract.js
// For now, use require with type assertions to avoid TypeScript errors
const mammoth = require('mammoth') as any;
const Tesseract = require('tesseract.js') as any;
import { anthropic } from './anthropicService';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Extract text from a PDF file
 * @param file PDF file to process
 * @returns Extracted text content
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Extract text from a DOCX file
 * @param file DOCX file to process
 * @returns Extracted text content
 */
export async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

/**
 * Extract text from an image using OCR
 * @param file Image file (JPG, PNG, etc.)
 * @returns Extracted text content
 */
export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const { data } = await Tesseract.recognize(file, 'rus+eng', {
      logger: (m: any) => console.log(m)
    });
    
    return data.text.trim();
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error('Failed to extract text from image');
  }
}

/**
 * Extract text from an image using Claude Vision
 * @param file Image file to process
 * @returns Extracted text content
 */
export async function extractTextFromImageWithClaude(file: File): Promise<string> {
  try {
    // Convert the file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    // Get the correct media type for Claude API
    // Claude only supports these image types
    let mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp" = "image/png";
    
    if (file.type === "image/jpeg" || file.type === "image/png" || 
        file.type === "image/gif" || file.type === "image/webp") {
      mediaType = file.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
    }
    
    // Create a message with the image
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4096,
      system: "You are a helpful assistant that extracts text from images. Extract all visible text from the image, preserving the original language.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64
              }
            },
            {
              type: "text",
              text: "Please extract all text from this image, preserving the original language and formatting as much as possible."
            }
          ]
        }
      ]
    });
    
    if (response.content[0].type === 'text') {
      return response.content[0].text;
    }
    
    return 'Error: Unexpected response format';
  } catch (error) {
    console.error('Error extracting text from image with Claude:', error);
    throw new Error('Failed to extract text from image with Claude');
  }
}

/**
 * Process a document file and extract its text content
 * @param file File to process
 * @returns Extracted text content
 */
export async function processDocument(file: File): Promise<string> {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  // Process based on file type
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return extractTextFromPDF(file);
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
    fileName.endsWith('.docx')
  ) {
    return extractTextFromDOCX(file);
  } else if (
    fileType === 'application/msword' || 
    fileName.endsWith('.doc')
  ) {
    throw new Error('DOC format is not supported. Please convert to DOCX.');
  } else if (
    fileType.startsWith('image/') || 
    fileName.endsWith('.jpg') || 
    fileName.endsWith('.jpeg') || 
    fileName.endsWith('.png') || 
    fileName.endsWith('.heic')
  ) {
    // For HEIC and other image formats, use Claude Vision for better results
    if (fileName.endsWith('.heic')) {
      return extractTextFromImageWithClaude(file);
    }
    
    // For standard image formats, try Tesseract first, fall back to Claude if needed
    try {
      const text = await extractTextFromImage(file);
      // If Tesseract returns very little text, try Claude Vision
      if (text.length < 50) {
        return extractTextFromImageWithClaude(file);
      }
      return text;
    } catch (error) {
      console.warn('Tesseract OCR failed, falling back to Claude Vision:', error);
      return extractTextFromImageWithClaude(file);
    }
  } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
    return await file.text();
  } else {
    throw new Error(`Unsupported file format: ${fileType || fileName}`);
  }
}

export {};

//todo: add document processing service, esp for pdf, docx formats, but also need for .jpg, .png, .heic formats for text extraction from images

