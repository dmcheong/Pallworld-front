import React from 'react';

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">€{price}</p>
    </div>
  );
};

export default ProductCard;
