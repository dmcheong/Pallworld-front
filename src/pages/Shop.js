import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import ScrollToTopButton from '../components/ScrollToTopButton'; // Import du composant
import axios from 'axios';

const Shop = () => {
  const { category } = useParams(); // Récupère la catégorie à partir de l'URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/products', {
          params: { category }
        });
        console.log('Produits récupérés :', response.data); // Ajouter ce log pour voir ce qui est retourné
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category]);  

  return (
    <div>
      <Header />

      {/* Section Hero */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">{category.toUpperCase()}</h1>
        </div>
      </section>

      {/* Section des produits */}
      <section className="container mx-auto py-8">
        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <ProductList products={products} /> // Passer les produits filtrés au composant ProductList
        )}
      </section>

      {/* Bouton Retour en haut */}
      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

export default Shop;
