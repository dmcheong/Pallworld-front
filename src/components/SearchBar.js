import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openSearch = () => {
    setIsSearchOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    document.body.style.overflow = 'auto'; 
    setSearchQuery(''); 
    setSearchResults([]); 
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSearchInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('http://localhost:3005/api/search', {
        params: { query }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    closeSearch(); 
  };

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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <FaSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-600 " />
              <input
                type="text"
                placeholder="Rechercher un produit"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full py-3 pl-10 pr-10 text-lg text-gray-700 border rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600 bg-white shadow-lg"
              />
              <button
                className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-600 hover:text-gray-800"
                onClick={closeSearch}
              >
                <FaTimes />
              </button>

              {/* Résultats de recherche */}
              {searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center p-2 hover:bg-gray-200 hover:rounded-lg cursor-pointer"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <span>{product.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Loader */}
              {loading && <div className="absolute mt-2 w-full text-center text-gray-600">Chargement...</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBar;
