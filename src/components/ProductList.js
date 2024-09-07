import React from 'react';
import ProductCard from './ProductCard';
import comingsoon from '../assets/coming-soon.jpg';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.images[0] || {comingsoon}}
            title={product.name}
            price={product.price}
          />
        ))
      ) : (
        <p>Aucun produit disponible dans cette catégorie.</p>
      )}
    </div>
  );
};

export default ProductList;
