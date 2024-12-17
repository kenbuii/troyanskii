import React, { useState } from 'react';
import './styles/TranslationInterface.css';

const TranslationInterface: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');

  const handleTranslation = async () => {
    // Implementation for Claude API call will go here
  };

  return (
    <div className="translation-container">
      <div className="translation-panel">
        <div className="source-text">
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter Russian text..."
          />
        </div>
        <div className="translated-text">
          <textarea
            value={translatedText}
            readOnly
            placeholder="English translation will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default TranslationInterface;