import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    color: '',
    size: '',
    minPrice: 0,
    maxPrice: 100,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
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
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-full">
      <h3 className="text-xl font-bold mb-6">Filtres</h3>

      {/* Couleur */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Couleur</label>
        <input
          type="text"
          name="color"
          value={filters.color}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          placeholder="Ex: Rouge, Bleu"
        />
      </div>

      {/* Taille */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Taille</label>
        <select
          name="size"
          value={filters.size}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Toutes les tailles</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="2XL">2XL</option>
        </select>
      </div>

      {/* Gamme de prix avec Slider */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Prix Min</label>
        <input
          type="range"
          name="minPrice"
          min="0"
          max="100"
          value={filters.minPrice}
          onChange={handleChange}
          className="w-full range-slider"
        />
        <span className="text-gray-700">€{filters.minPrice}</span>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Prix Max</label>
        <input
          type="range"
          name="maxPrice"
          min="0"
          max="100"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full range-slider"
        />
        <span className="text-gray-700">€{filters.maxPrice}</span>
      </div>

      {/* Boutons */}
      <div className="flex justify-between">
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          Réinitialiser
        </button>
        <button
          onClick={() => onFilterChange(filters)}
          className="bg-sky-600 text-white px-4 py-2 rounded-md"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
