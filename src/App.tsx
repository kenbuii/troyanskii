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

      {/* <div className="App-subheader">
        <p>
          This is a landing page for the Troyanskii project. 
          
          Seeing as this is a domain-specific project, this is a tailored machine translation project to translate Russian language documents and text to English. 
        </p>
        <p>Other languages may be supported at a later date.</p>
      </div> */}

      <div className="App-container">
        <div className="translation-interface">
          <TranslationInterface />
        </div>
        <div className="sidebar-analysis">
          <SidebarAnalysis highlights={[]} />
        </div>
      </div>
     
      <div className="App-footer"> 
        <p>
          All rights reserved. Created by Kenneth Bui.
        </p>
      </div>
    </div>
  );
}

export default App;
