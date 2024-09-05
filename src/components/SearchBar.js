import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
    document.body.style.overflow = 'hidden'; // Disable scroll
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    document.body.style.overflow = 'auto'; // Enable scroll
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <FaSearch
        className="text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={openSearch}
      />

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50"
          onClick={closeSearch}
        >
          <div
            className="relative w-full max-w-2xl bg-transparent px-4"
            onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside the input
          >
            <div className="relative">
              <FaSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-600 " />
              <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-10 pr-10 text-lg text-gray-700 border rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600 bg-white shadow-lg"
              />
              <button
                className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-600 hover:text-gray-800"
                onClick={closeSearch}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBar;
