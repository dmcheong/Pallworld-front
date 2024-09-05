import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const TextInput = ({ label, name, value, onChange, type = "text", required = false, className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-semibold mb-2 text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
          required={required}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
