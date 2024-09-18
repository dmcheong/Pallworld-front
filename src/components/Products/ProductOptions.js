import React from 'react';

const ProductOptions = ({ colors, sizes, selectedColor, setSelectedColor, selectedProductSize, setSelectedProductSize }) => {
  return (
    <div>
      {/* Sélection de la couleur */}
      {colors && colors.length > 0 && (
        <section className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">Couleurs disponibles :</label>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {colors.map((color) => (
              <button 
                key={color} 
                onClick={() => setSelectedColor(color)}
                className={`px-6 py-2 rounded-lg border ${selectedColor === color ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} cursor-pointer`}
              >
                {color}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Sélection de la taille */}
      {sizes && sizes.length > 0 && (
        <section className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">Taille ou format :</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button 
                key={size} 
                onClick={() => setSelectedProductSize(size)} 
                className={`px-6 py-2 rounded-lg text-sm border ${selectedProductSize === size ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} cursor-pointer`}
              >
                {size}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductOptions;
