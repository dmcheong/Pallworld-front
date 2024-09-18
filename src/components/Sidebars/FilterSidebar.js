import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterSidebar = ({ onFilterChange, category }) => {
  const [filters, setFilters] = useState({
    color: '', // Modifié pour accepter une seule couleur
    size: '',
    minPrice: 0,
    maxPrice: 100,
  });
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/products/sizes', {
          params: { category },
        });
        setAvailableSizes(response.data.sizes);
      } catch (error) {
        console.error('Erreur lors de la récupération des tailles disponibles:', error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/products/colors', {
          params: { category },
        });
        setAvailableColors(response.data.colors);
      } catch (error) {
        console.error('Erreur lors de la récupération des couleurs disponibles:', error);
      }
    };

    fetchSizes();
    fetchColors();
  }, [category]);

  const handleColorClick = (color) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      color: prevFilters.color === color ? '' : color, // Un seul choix de couleur à la fois
    }));
  };

  const handleChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      color: '',
      size: '',
      minPrice: 0,
      maxPrice: 100,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Filtres</h3>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Couleurs disponibles :</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorClick(color)}
              className={`px-3 py-2 rounded-lg border ${
                filters.color === color
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Taille</label>
        <select
          value={filters.size}
          onChange={(e) => handleChange('size', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Toutes les tailles</option>
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Prix Min (€)</label>
        <input
          type="range"
          value={filters.minPrice}
          min="0"
          max="100"
          onChange={(e) => handleChange('minPrice', e.target.value)}
          className="w-full"
        />
        <span>{filters.minPrice}€</span>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Prix Max (€)</label>
        <input
          type="range"
          value={filters.maxPrice}
          min="0"
          max="100"
          onChange={(e) => handleChange('maxPrice', e.target.value)}
          className="w-full"
        />
        <span>{filters.maxPrice}€</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded-md">
          Réinitialiser
        </button>
        <button onClick={handleSubmit} className="bg-sky-600 text-white px-4 py-2 rounded-md">
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
