import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/Products/ProductList';
import ScrollToTopButton from '../components/ScrollToTopButton';
import FilterSidebar from '../components/Sidebars/FilterSidebar';
import FilterModal from '../modals/FilterModal';
import axios from 'axios';

const Shop = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1024);

  const productsPerPage = 8;

  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get('http://localhost:3005/api/products', {
        params: { ...filters, category, page, limit: productsPerPage }
      });
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [filters, category, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatCategoryTitle = (category) => {
    return category.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  };

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsFilterModalOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Header />

      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">{formatCategoryTitle(category)}</h1>
        </div>
      </section>

      <section className="container mx-auto py-8 flex flex-col md:flex-row">
        {isScreenSmall ? (
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="bg-sky-600 text-white px-4 py-2 rounded-md"
            >
              Filtres
            </button>
          </div>
        ) : (
          <div className="hidden md:block md:w-1/4 w-full md:pr-8">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        )}

        {/* Modal pour les filtres pour petit écrans */}
        <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </FilterModal>

        <div className="md:w-3/4 w-full">
          {loading ? (
            <p>Chargement des produits...</p>
          ) : (
            <ProductList
              products={products}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>

      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

export default Shop;
