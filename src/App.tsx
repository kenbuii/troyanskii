import React from 'react';
import './styles/global.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TranslationTabs from './components/TranslationTabs';
import SidebarAnalysis from './components/SidebarAnalysis';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      
      <main className="main">
        <div className="content-container">
          <div className="content-layout">
            <TranslationTabs />
            <SidebarAnalysis highlights={[]} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
