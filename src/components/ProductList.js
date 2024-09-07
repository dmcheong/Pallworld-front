import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import comingsoon from '../assets/coming-soon.jpg';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/products', {
          params: { category }
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}  // Passer l'ID du produit ici
            image={product.images[0] || {comingsoon}}  // Image par défaut si aucune n'est disponible
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
