import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { translateText } from '../services/anthropicService';
import Card from './common/Card';
import TextArea from './common/TextArea';
import Button from './common/Button';
import Spinner from './common/Spinner';
import Alert from './common/Alert';
import './TranslationInterface.css';

const DEBOUNCE_DELAY = 1000; // 1 second delay

const TranslationInterface: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedTranslate = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setTranslatedText('');
        setError(null);
        return;
      }

      try {
        setIsTranslating(true);
        setError(null);
        const translation = await translateText(text);
        setTranslatedText(translation);
      } catch (error) {
        setError('Translation error occurred. Please try again.');
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

  const handleClearText = () => {
    setSourceText('');
    setTranslatedText('');
    setError(null);
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="translation-interface">
      <div className="translation-container">
        <Card className="translation-card">
          <div className="translation-header">
            <h2 className="translation-title">Russian to English Translation</h2>
            <p className="translation-description">
              Enter Russian text in the left panel and see the English translation on the right.
            </p>
          </div>
          
          {error && (
            <Alert 
              variant="error" 
              onClose={handleDismissError}
              className="translation-alert"
            >
              {error}
            </Alert>
          )}
          
          <div className="translation-panels">
            <div className="source-panel">
              <TextArea
                label="Russian Text"
                value={sourceText}
                onChange={handleSourceTextChange}
                placeholder="Enter Russian text here..."
                fullWidth
              />
            </div>
            
            <div className="translation-panel">
              <div className="translation-label-container">
                <label className="textarea-label">English Translation</label>
                {isTranslating && (
                  <span className="translation-loading">
                    <Spinner size="sm" />
                    <span className="translation-loading-text">Translating...</span>
                  </span>
                )}
              </div>
              <TextArea
                value={translatedText}
                placeholder={isTranslating ? 'Translating...' : 'Translation will appear here...'}
                readOnly
                fullWidth
              />
            </div>
          </div>
          
          <div className="translation-actions">
            <Button 
              variant="outline" 
              onClick={handleClearText}
              disabled={!sourceText && !translatedText}
            >
              Clear Text
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TranslationInterface;