// SubmissionAlert.js
import React from 'react';
import Alert from 'react-bootstrap/Alert';

function SubmissionAlert({ show, message, variant, onClose }) {
  if (!show) return null; 
  
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

export default SubmissionAlert;
