import React, { useState } from 'react';
import Tabs, { TabItem } from './common/Tabs';
import TranslationInterface from './TranslationInterface';
import DocumentUpload from './DocumentUpload';
import './TranslationTabs.css';

const TranslationTabs: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Here you would typically process the file and extract text for translation
    console.log('File uploaded:', file.name);
  };

  const tabs: TabItem[] = [
    {
      id: 'text',
      label: 'Text Translation',
      content: <TranslationInterface />
    },
    {
      id: 'document',
      label: 'Document Translation',
      content: <DocumentUpload onFileUpload={handleFileUpload} />
    }
  ];

  return (
    <div className="translation-tabs">
      <Tabs tabs={tabs} defaultActiveTab="text" />
    </div>
  );
};

export default TranslationTabs; 