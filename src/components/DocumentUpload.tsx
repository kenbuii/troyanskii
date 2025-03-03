import React, { useState, useRef, ChangeEvent } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { processDocument } from '../services/documentProcessing';
import { translateText } from '../services/anthropicService';
import './DocumentUpload.css';

interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [extractedText, setExtractedText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Reset states when a new file is selected
      setExtractedText('');
      setTranslatedText('');
      setProcessingStatus('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      // Reset states when a new file is selected
      setExtractedText('');
      setTranslatedText('');
      setProcessingStatus('');
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        setIsProcessing(true);
        setProcessingStatus('Extracting text from document...');
        
        // Process the document to extract text
        const text = await processDocument(selectedFile);
        setExtractedText(text);
        
        // Notify parent component
        onFileUpload(selectedFile);
        
        // Translate the extracted text
        setProcessingStatus('Translating text...');
        const translated = await translateText(text);
        setTranslatedText(translated);
        
        setProcessingStatus('Document processed and translated successfully!');
      } catch (error) {
        console.error('Error processing document:', error);
        setProcessingStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <Card className="document-upload-card">
      <div className="document-upload-header">
        <h2 className="document-upload-title">Upload Document</h2>
        <p className="document-upload-description">
          Upload a document in Russian to translate it to English.
        </p>
      </div>

      <div 
        className={`document-upload-dropzone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.heic"
          className="document-upload-input"
        />
        
        {selectedFile ? (
          <div className="document-upload-file-info">
            <div className="document-upload-file-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="document-upload-file-name">{selectedFile.name}</div>
            <div className="document-upload-file-size">{(selectedFile.size / 1024).toFixed(2)} KB</div>
          </div>
        ) : (
          <div className="document-upload-placeholder">
            <div className="document-upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="document-upload-text">
              <p>Drag and drop a file here, or click to browse</p>
              <p className="document-upload-formats">Supported formats: PDF, DOCX, TXT, JPG, PNG, HEIC</p>
            </div>
          </div>
        )}
      </div>

      {processingStatus && (
        <div className={`document-upload-status ${isProcessing ? 'processing' : ''}`}>
          {processingStatus}
        </div>
      )}

      <div className="document-upload-actions">
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!selectedFile || isProcessing}
          fullWidth
        >
          {isProcessing ? 'Processing...' : 'Upload and Translate'}
        </Button>
      </div>

      {extractedText && (
        <div className="document-upload-result">
          <h3>Extracted Text:</h3>
          <div className="document-text-content">
            {extractedText}
          </div>
        </div>
      )}

      {translatedText && (
        <div className="document-upload-result">
          <h3>Translated Text:</h3>
          <div className="document-text-content">
            {translatedText}
          </div>
        </div>
      )}
    </Card>
  );
};

export default DocumentUpload;
