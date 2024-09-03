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
      <section className="bg-sky-600 text-white py-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10">NOS CATEGORIES</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 container mx-auto">
          <Link to="/shop/textile" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={textile} alt="Textile" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">TEXTILE</h3>
              <p className="text-sm">T-shirts, hoodies, et plus</p>
            </div>
          </Link>

          <Link to="/shop/goodies" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={goodies} alt="Goodies" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">GOODIES</h3>
              <p className="text-sm">Accessoires, gadgets, et plus</p>
            </div>
          </Link>

          <Link to="/shop/promos" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={promos} alt="Promos" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">PROMOS</h3>
              <p className="text-sm">Offres spéciales et réductions</p>
            </div>
          </Link>

          <Link to="/shop/tokens" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={tokens} alt="Tokens" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">TOKENS</h3>
              <p className="text-sm">Achetez des tokens pour générer des images</p>
            </div>
          </Link>
        </div>
      </section>

      {/* How it works  */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            Une envie de textile, de goodies ou juste d'une décoration supplémentaire ?
          </h2>
          <p className="text-lg sm:text-xl font-medium mb-12">
            Voici les étapes à suivre :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-sky-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
                <span>1</span>
              </div>
              <p className="text-lg sm:text-xl font-medium">
                Choisissez le produit de votre choix
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
                <span>2</span>
              </div>
              <p className="text-lg sm:text-xl font-medium">
                Générez une image de votre Pal préféré
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-yellow-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
                <span>3</span>
              </div>
              <p className="text-lg sm:text-xl font-medium">
                Personnalisez le produit choisi
              </p>
            </div>
          </div>

          <Link to="/shop/textile" className="inline-block mt-12">
            <button className="bg-sky-600 text-white py-3 px-8 rounded-full text-lg sm:text-xl font-semibold hover:bg-sky-800 shadow-md transform transition-transform duration-300 hover:scale-105">
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
