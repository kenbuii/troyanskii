import React from 'react';
import './App.css';
import TranslationInterface from './components/TranslationInterface';
import { SidebarAnalysis } from './components/SidebarAnalysis';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Troyanskii
      </header>
      <div className="App-container">
        <TranslationInterface />
        <SidebarAnalysis highlights={[]} />
      </div>
    </div>
  );
}

export default App;
