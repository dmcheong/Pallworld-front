import React from 'react';

const Alert = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'}`}>
      {message}
    </div>
  );
};

export default Alert;
