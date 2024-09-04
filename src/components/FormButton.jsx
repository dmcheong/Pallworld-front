import React from 'react';

const FormButton = ({ text, onClick, type = 'submit', color = 'sky' }) => {
  const baseStyle = `w-full text-white py-2 px-4 rounded transition-colors duration-300`;
  const colorStyle = color === 'red' ? 'bg-red-600 hover:bg-red-800' : 'bg-sky-600 hover:bg-sky-800';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${colorStyle}`}
    >
      {text}
    </button>
  );
};

export default FormButton;
