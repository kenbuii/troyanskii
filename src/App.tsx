import React, { useEffect } from 'react';
import './App.css';
import TranslationInterface from './components/TranslationInterface';
import { SidebarAnalysis } from './components/SidebarAnalysis';

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Troyanskii
      </header>
      <div className="App-subheader">
        <p>
          This is a landing page for the Troyanskii project. 
          
          Seeing as this is a domain-specific project, this is a tailored machine translation project to translate Russian language documents and text to English. 
        </p>
        <p>Other languages may be supported at a later date.</p>
      </div>
      <div className="App-container">
        <TranslationInterface />
        <SidebarAnalysis highlights={[]} />
      </div>
      <div className="App-footer"> 
        <p>
          All rights reserved. This project was created by Kenneth Bui to assist in the translation of Russian-language Soviet-era documents for his Honors Thesis in Science, Technology, and Society at Stanford University. 
        </p>
      </div>
    </div>
  );
}

export default App;
