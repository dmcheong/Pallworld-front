import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ProductCharacteristics = ({ characteristics }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full px-4 py-2 text-gray-700 rounded-md focus:outline-none"
      >
        <span className="text-lg font-semibold">Caractéristiques</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <ul className="mt-2 text-sm text-gray-600 pl-4 list-disc">
          {characteristics.split('\n').map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductCharacteristics;
