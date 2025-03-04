import React, { useState, createContext, useContext } from 'react';
import './styles/global.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TranslationTabs from './components/TranslationTabs';
import Spinner from './components/common/Spinner';
import './App.css';

// Create a context for loading state
interface LoadingContextType {
  isLoading: boolean;
  loadingProgress: number;
  loadingMessage: string;
  setLoading: (isLoading: boolean, progress?: number, message?: string) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  loadingProgress: 0,
  loadingMessage: '',
  setLoading: () => {},
});

// Custom hook to use the loading context
export const useLoading = () => useContext(LoadingContext);

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const setLoading = (loading: boolean, progress: number = 0, message: string = '') => {
    setIsLoading(loading);
    setLoadingProgress(progress);
    setLoadingMessage(message);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingProgress, loadingMessage, setLoading }}>
      <div className="app">
        <Header />
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-container">
              <Spinner size="lg" />
              <div className="loading-text">{loadingMessage}</div>
              {loadingProgress > 0 && (
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <main className="main">
          <div className="content-container">
            <div className="content-layout">
              <TranslationTabs />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </LoadingContext.Provider>
  );
}

export default App;
