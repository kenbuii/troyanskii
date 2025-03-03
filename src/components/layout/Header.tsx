import React from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Troyanskii' }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        <div className="header-subtitle">
          Specialized Russian to English Translation
        </div>
      </div>
    </header>
  );
};

export default Header; 