import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-copyright">
            © {currentYear} Troyanskii. All rights reserved. Created by Kenneth Bui.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 