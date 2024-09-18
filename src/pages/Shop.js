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

  const productsPerPage = 8;

  // Fetch products based on filters, category, and page
  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get('http://localhost:3005/api/products', {
        params: { ...filters, category, page, limit: productsPerPage },
      });
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [filters, category, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    setIsFilterModalOpen(false); // Close modal when filters are applied
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatCategoryTitle = (category) => {
    return category.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-sky-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">{formatCategoryTitle(category)}</h1>
        </div>
      </section>

      <main className="flex-1 container mx-auto py-10 flex flex-col lg:flex-row gap-10">
        {/* Sidebar for filters on large screens */}
        <aside className="hidden lg:block lg:w-1/4">
          <FilterSidebar onFilterChange={handleFilterChange} category={category} />
        </aside>

        {/* Button for mobile filters */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="lg:hidden bg-sky-600 text-white p-4 rounded-full fixed bottom-6 right-6 shadow-lg z-50"
        >
          Filtres
        </button>

        {/* Filter Modal for mobile */}
        <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
          <FilterSidebar onFilterChange={handleFilterChange} category={category} />
        </FilterModal>

        {/* Product List */}
        <div className="lg:w-3/4 w-full">
          {loading ? (
            <div className="text-center">Chargement des produits...</div>
          ) : (
            <ProductList
              products={products}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Shop;
