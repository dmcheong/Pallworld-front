import React from 'react';

const SelectInput = ({ label, name, value, onChange, options, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2 text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
      >
        <option value="" disabled hidden>
          Sélectionnez une option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
