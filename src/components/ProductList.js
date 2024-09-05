import React from 'react';
import ProductCard from './ProductCard';
import comingsoon from '../assets/coming-soon.jpg';

const products = [
  { id: 1, title: 'Produit 1', price: '19.99', image: comingsoon },
  { id: 2, title: 'Produit 2', price: '29.99', image: comingsoon },
  { id: 3, title: 'Produit 3', price: '39.99', image: comingsoon },
  { id: 4, title: 'Produit 4', price: '49.99', image: comingsoon },
  { id: 5, title: 'Produit 5', price: '59.99', image: comingsoon },
  { id: 6, title: 'Produit 6', price: '69.99', image: comingsoon },
];

const ProductList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
