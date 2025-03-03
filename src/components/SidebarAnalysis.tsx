import React from 'react';
import { HighlightedTerm } from '../types';
import Card from './common/Card';
import './SidebarAnalysis.css';

interface SidebarAnalysisProps {
  highlights: HighlightedTerm[];
}

export const SidebarAnalysis: React.FC<SidebarAnalysisProps> = ({ highlights }) => {
  return (
    <div className="sidebar-analysis">
      <Card className="sidebar-card">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Analysis</h2>
        </div>
        
        <div className="highlights-section">
          <h3 className="highlights-title">Highlighted Terms</h3>
          
          {highlights.length > 0 ? (
            <div className="highlights-list">
              {highlights.map((highlight: HighlightedTerm, index: number) => (
                <div key={index} className="highlight-item">
                  <div className="term">
                    <span className="russian-term">{highlight.term}</span>
                    <span className="romanization">({highlight.romanization})</span>
                  </div>
                  <div className="translations">
                    {highlight.possibleTranslations.map((translation: string, i: number) => (
                      <div key={i} className="translation-option">
                        {translation}
                      </div>
                    ))}
                  </div>
                  <div className="context">{highlight.sourceContext}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No highlighted terms yet.</p>
              <p className="empty-state-hint">
                Highlighted terms will appear here as you translate text.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SidebarAnalysis;
