import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/Products/ProductList';
import ScrollToTopButton from '../components/ScrollToTopButton';
import FilterSidebar from '../components/Sidebars/FilterSidebar';
import FilterModal from '../modals/FilterModal';
import axios from 'axios';

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); 
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]); 

  const productsPerPage = 8;

  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT_BDD_API}/api/search`, {
        params: { query, ...filters, page, limit: productsPerPage },
      });
      const productsData = response.data || [];
      setProducts(productsData);

      const colors = new Set();
      const sizes = new Set();
      productsData.forEach(product => {
        product.colors.forEach(color => colors.add(color));
        product.sizes.forEach(size => sizes.add(size)); 
      });

      setAvailableColors([...colors]);
      setAvailableSizes([...sizes]);    
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
  }, [filters, query, currentPage]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-sky-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Résultats de recherche pour : {query}</h1>
        </div>
      </section>

      <main className="flex-1 container mx-auto py-10 flex flex-col lg:flex-row gap-10">
        {/* Filtres sur grand écran */}
        <aside className="hidden lg:block lg:w-1/4">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            availableColorsFromSearch={availableColors}
            availableSizesFromSearch={availableSizes} 
          />
        </aside>

        {/* Filtres sur mobile */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="lg:hidden bg-sky-600 text-white p-4 rounded-full fixed bottom-6 right-6 shadow-lg z-50"
        >
          Filtres
        </button>

        <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
          <FilterSidebar
            onFilterChange={handleFilterChange}
            availableColorsFromSearch={availableColors}
            availableSizesFromSearch={availableSizes} 
          />
        </FilterModal>

        {/* Liste des produits */}
        <div className="lg:w-3/4 w-full">
          {loading ? (
            <div className="text-center">Chargement des produits...</div>
          ) : products.length > 0 ? (
            <ProductList
              products={products}
              currentPage={currentPage}
              totalPages={totalPages}  
              onPageChange={handlePageChange} 
            />
          ) : (
            <p className="text-center">Aucun produit disponible pour cette recherche.</p>
          )}
        </div>
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
