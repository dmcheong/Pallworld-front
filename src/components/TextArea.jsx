import React from 'react';

const TextArea = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2 text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
      />
    </div>
  );
};

export default TextArea;
