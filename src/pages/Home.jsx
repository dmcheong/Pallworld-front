import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import hero from '../assets/hero.jpg';
import goodies from '../assets/categories/goodies.jpg';
import promos from '../assets/categories/promos.jpg';
import textile from '../assets/categories/textile.jpg';
import tokens from '../assets/categories/tokens.jpg';

import ProductCarousel from '../components/ProductCarousel';

const Home = () => {
  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="relative">
        <img 
          src={hero}
          alt="Hero" 
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover"
        />
      </section>

      {/* Categories */}
      <section className="bg-sky-600 text-white py-8">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">CATEGORIES</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto">
          <Link to="/shop/textile" className="relative group">
            <img src={textile} alt="Textile" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gray-200 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold mb-4">TEXTILE →</h3>
            </div>
          </Link>

          <Link to="/shop/goodies" className="relative group">
            <img src={goodies} alt="Goodies" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gray-200 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold mb-4">GOODIES →</h3>
            </div>
          </Link>

          <Link to="/shop/promos" className="relative group">
            <img src={promos} alt="Promos" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gray-200 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold mb-4">PROMOS →</h3>
            </div>
          </Link>

          <Link to="/shop/tokens" className="relative group">
            <img src={tokens} alt="Tokens" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gray-200 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold mb-4">TOKENS →</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* How it works  */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Une envie de textile, de goodies ou juste d'une décoration supplémentaire ?</h2>
          <p className="text-lg sm:text-xl font-medium mb-12">Voici les étapes à suivre :</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl bg-sky-600 text-white rounded-full p-4 mb-4">
                1
              </div>
              <p className="text-lg sm:text-xl font-medium">Choisissez le produit de votre choix</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl bg-green-500 text-white rounded-full p-4 mb-4">
                2
              </div>
              <p className="text-lg sm:text-xl font-medium">Générez une image de votre Pal préféré</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl bg-yellow-500 text-white rounded-full p-4 mb-4">
                3
              </div>
              <p className="text-lg sm:text-xl font-medium">Personnalisez le produit choisi</p>
            </div>
          </div>

          <Link to="/shop/textile">
            <button className="bg-sky-600 text-white py-3 px-6 rounded-lg text-lg sm:text-xl font-semibold hover:bg-sky-800 transition-colors duration-300">
              Utilisez notre outil dès maintenant !
            </button>
          </Link>
        </div>
      </section>

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
