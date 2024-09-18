import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, title, price, oldPrice, category }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg transform transition-transform duration-300 hover:scale-95 hover:shadow-xl">
      <Link to={`/product/${id}`}>
        <div className="aspect-w-4 aspect-h-3 mb-4">
          <img src={image} alt={title} className="w-full h-full object-contain rounded" />
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>

        <div className="flex items-center space-x-2">
          {oldPrice && (
            <p className="text-red-500 line-through">€{oldPrice}</p>
          )}
          <p className="text-black font-semibold">€{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;