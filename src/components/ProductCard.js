import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, title, price }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg transform transition-transform duration-300 hover:scale-95 hover:shadow-xl">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">€{price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
