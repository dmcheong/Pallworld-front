import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';

import textileBanner from '../assets/banners/textile-banner.jpg';
import goodiesBanner from '../assets/banners/goodies-banner.jpg';
import promosBanner from '../assets/banners/promos-banner.jpg';

const banners = {
  textile: textileBanner,
  goodies: goodiesBanner,
  promos: promosBanner,
};

const Shop = () => {
  const { category } = useParams();
  const bannerImage = banners[category] || banners['textile'];

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Header />

      {/* Banner Section */}
      <section className="relative">
        <img
          src={bannerImage}
          alt={`${category} Banner`}
          className="w-full h-[80px] sm:h-[100px] md:h-[150px] lg:h-[200px] object-cover"
        />
      </section>

      {/* Filters and Products Section */}
      <section className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg sm:text-xl font-semibold">6 Produits</span>
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <i className="mr-2 fa fa-filter" aria-hidden="true"></i>
            Filtres
          </button>
        </div>

        <ProductList />
      </section>

      {/* FAQ Section */}
      <section className="bg-sky-600 text-white py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">UNE QUESTION ?</h2>
        <Link
          to="/faq"
          className="bg-white text-sky-600 py-3 px-6 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-200 transition-colors duration-300 inline-block"
        >
          FAQ →
        </Link>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-sky-600 text-white p-5 rounded-full shadow-lg hover:bg-sky-800 transition-colors duration-300 text-2xl"
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Shop;
