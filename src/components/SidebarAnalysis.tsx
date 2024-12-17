import React from 'react';
import { HighlightedTerm } from '../types';
import './styles/SidebarAnalysis.css';

interface SidebarAnalysisProps {
  highlights: HighlightedTerm[];
}

export const SidebarAnalysis: React.FC<SidebarAnalysisProps> = ({ highlights }) => {
  return (
    <div className="sidebar-container">
      <div className="highlights-section">
        <h3>Highlighted Terms</h3>
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
    </div>
  );
};
