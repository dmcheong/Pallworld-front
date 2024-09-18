import React from 'react';

const ProductCustomization = ({
  customizationOptions,
  selectedPosition,
  setSelectedPosition,
  selectedCustomizationSize,
  setSelectedCustomizationSize,
  handleAddToCart,
}) => {
  return (
    <section id="customization-section" className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-8">
      <h2 className="text-2xl font-bold mb-4">Personnalisation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-gray-700 text-lg mb-2">Position :</label>
          <select 
            className="p-2 border rounded mb-4 w-full" 
            value={selectedPosition} 
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            {customizationOptions.map((option) => (
              <option key={option.position} value={option.position}>{option.position}</option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-gray-700 text-lg mb-2">Taille de personnalisation :</label>
          <select 
            className="p-2 border rounded mb-4 w-full" 
            value={selectedCustomizationSize} 
            onChange={(e) => setSelectedCustomizationSize(e.target.value)}
          >
            {customizationOptions
              .find(option => option.position === selectedPosition)
              .customizationSize.map((size) => (  
                <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={handleAddToCart} 
        className="mt-4 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300"
      >
        Ajouter au panier
      </button>
    </section>
  );
};

export default ProductCustomization;
