import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ProductCard from '../components/Products/ProductCard'; 
import axios from 'axios';

const Promos = () => {
  const [promoProducts, setPromoProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 8;

  const fetchPromoProducts = async (page = 1) => {
    try {
      const response = await axios.get('http://localhost:3005/api/products/promos', {
        params: { page, limit: productsPerPage },
      });
      setPromoProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits en promotion:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Section titre de la page "Promos" */}
      <section className="bg-sky-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Nos promos</h1>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 container mx-auto py-10">
        <div className="w-full">
          {loading ? (
            <div className="text-center">Chargement des produits en promotion...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.isArray(promoProducts) && promoProducts.length > 0 ? (
                promoProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    image={product.images[0]}
                    title={product.name}
                    price={product.discountPrice ? product.discountPrice : product.price}
                    oldPrice={product.discountPrice ? product.price : null}
                  />
                ))
              ) : (
                <p>Aucun produit en promotion pour le moment.</p>
              )}
            </div>
          )}
        </div>
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Promos;
