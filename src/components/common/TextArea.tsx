import React, { TextareaHTMLAttributes } from 'react';
import './TextArea.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  error?: string;
  fullWidth?: boolean;
  hideLabel?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = false,
  hideLabel = false,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  const textareaClasses = [
    'textarea',
    error ? 'textarea-error' : '',
    fullWidth ? 'textarea-full-width' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`textarea-container ${fullWidth ? 'textarea-container-full-width' : ''}`}>
      {label && !hideLabel && (
        typeof label === 'string' ? (
          <label htmlFor={textareaId} className="textarea-label">
            {label}
          </label>
        ) : (
          label
        )
      )}
      <textarea
        id={textareaId}
        className={textareaClasses}
        {...props}
      />
      {error && <div className="textarea-error-message">{error}</div>}
    </div>
  );
};

export default TextArea; 