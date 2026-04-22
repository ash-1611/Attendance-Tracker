import React from 'react';
import '../styles/Alert.css';

const Alert = ({ type = 'info', message, onClose }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      <div className="alert-content">{message}</div>
      {onClose && (
        <button className="alert-close" onClick={onClose} aria-label="Close alert">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
