import React from 'react';

const FormButton = ({ text, onClick, type = 'submit' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default FormButton;
