import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import axios from 'axios';

const Shop = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Limite des produits par page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/products`, {
          params: { category, page: currentPage, limit: productsPerPage }
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentPage]);

  const totalPages = Math.ceil(products.totalCount / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">{category.toUpperCase()}</h1>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="container mx-auto py-8">
        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <>
            <ProductList products={products.items} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
