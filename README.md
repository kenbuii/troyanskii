# Troyanskii Document Translation Tool

A specialized tool for translating Russian documents to English, with a focus on Soviet-era documents related to cybernetics, the Scientific-Technological Revolution (STR), and political-economic reform.

## Features

- Text translation from Russian to English
- Document processing and translation (PDF, DOCX, TXT)
- Image text extraction and translation (JPG, PNG, HEIC)
- Specialized translation for Soviet-era terminology and concepts

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Required Dependencies

The document processing service requires the following packages:

```bash
npm install pdfjs-dist mammoth tesseract.js @anthropic-ai/sdk
# or
yarn add pdfjs-dist mammoth tesseract.js @anthropic-ai/sdk
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_ANTHROPIC_API_KEY=your_anthropic_api_key
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### Document Processing

The application supports processing and text extraction from various document formats:

- **PDF**: Extract text from PDF documents
- **DOCX**: Extract text from Microsoft Word documents
- **Images (JPG, PNG)**: Extract text using OCR (Optical Character Recognition)
- **HEIC**: Extract text using Claude Vision API

Example usage:

```typescript
import { processDocument } from './src/services/documentProcessing';

// Process a file input
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
fileInput.addEventListener('change', async (event) => {
  const file = fileInput.files?.[0];
  if (file) {
    try {
      const extractedText = await processDocument(file);
      console.log('Extracted text:', extractedText);
      // Now you can use the text for translation
    } catch (error) {
      console.error('Error processing document:', error);
    }
  }
});
```

### Translation

The application uses Claude AI to translate Russian text to English:

```typescript
import { translateText } from './src/services/anthropicService';

async function translateDocument(russianText: string) {
  try {
    const translatedText = await translateText(russianText);
    console.log('Translated text:', translatedText);
  } catch (error) {
    console.error('Error translating text:', error);
  }
}
```

## Development

### Project Structure

- `src/services/`: Service modules for API interactions and document processing
  - `anthropicService.ts`: Claude AI integration for translation
  - `documentProcessing.ts`: Document text extraction
  - `supabaseService.ts`: Database integration
- `src/components/`: React components
- `src/types/`: TypeScript type definitions

## License

[MIT License](LICENSE)
