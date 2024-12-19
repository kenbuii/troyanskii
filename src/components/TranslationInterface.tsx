import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { translateText } from '../services/anthropicService';
import './styles/TranslationInterface.css';

const DEBOUNCE_DELAY = 1000; // 1 second delay

const TranslationInterface: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const debouncedTranslate = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setTranslatedText('');
        return;
      }

      try {
        setIsTranslating(true);
        const translation = await translateText(text);
        setTranslatedText(translation);
      } catch (error) {
        setTranslatedText('Translation error occurred. Please try again.');
        console.error('Translation error:', error);
      } finally {
        setIsTranslating(false);
      }
    },
    []
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedTranslate(sourceText);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [sourceText, debouncedTranslate]);

  const handleSourceTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSourceText(e.target.value);
  };

  return (
    <div className="translation-container">
      <div className="translation-panel">
        <div className="source-text">
          <textarea
            value={sourceText}
            onChange={handleSourceTextChange}
            placeholder="Enter Russian text..."
          />
        </div>
        <div className="translated-text">
          <textarea
            value={isTranslating ? 'Translating...' : translatedText}
            readOnly
            placeholder="English translation will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default TranslationInterface;