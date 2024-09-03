import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AccordionItem = ({ question, answer, isActive, onClick }) => (
  <div className="bg-white shadow rounded-lg">
    <button
      className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold">{question}</h3>
      <span>
        {isActive ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </button>
    {isActive && (
      <div className="px-6 pb-4 text-gray-700 leading-relaxed">
        {answer}
      </div>
    )}
  </div>
);

export default AccordionItem;
