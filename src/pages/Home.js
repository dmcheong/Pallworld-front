import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import hero from '../assets/hero.jpg';
import tshirts from '../assets/categories/tshirts.webp';
import pulls from '../assets/categories/sweaters.webp';
import hoodies from '../assets/categories/hoodies.webp';
import debardeurs from '../assets/categories/tanktops.webp';
import phoneCases from '../assets/categories/phonecases.webp';
import stylos from '../assets/categories/pens.webp';
import gourdes from '../assets/categories/bottles.webp';
import porteCles from '../assets/categories/keyrings.webp';
import carnets from '../assets/categories/notebooks.webp';
import promos from '../assets/categories/promos.webp';

import ProductCarousel from '../components/Products/ProductCarousel';

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 container mx-auto">
          <Link to="/shop/t-shirts" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={tshirts} alt="T-shirts" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">T-SHIRTS</h3>
              <p className="text-sm">T-shirts pour toutes les occasions</p>
            </div>
          </Link>

          <Link to="/shop/pulls" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={pulls} alt="Pulls" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">PULLS</h3>
              <p className="text-sm">Restez au chaud avec style</p>
            </div>
          </Link>

          <Link to="/shop/hoodies" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={hoodies} alt="Hoodies" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy"/>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">HOODIES</h3>
              <p className="text-sm">Hoodies pour toutes les saisons</p>
            </div>
          </Link>

          <Link to="/shop/debardeurs" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={debardeurs} alt="Débardeurs" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">DÉBARDEURS</h3>
              <p className="text-sm">Parfait pour l'été</p>
            </div>
          </Link>

          <Link to="/shop/coques-pour-telephone" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={phoneCases} alt="Coques pour téléphone" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">COQUES POUR TÉLÉPHONE</h3>
              <p className="text-sm">Protégez votre téléphone avec style</p>
            </div>
          </Link>

          <Link to="/shop/stylos" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={stylos} alt="Stylos" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">STYLOS</h3>
              <p className="text-sm">Stylos élégants pour votre bureau</p>
            </div>
          </Link>

          <Link to="/shop/gourdes" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={gourdes} alt="Gourdes" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">GOURDES</h3>
              <p className="text-sm">Restez hydraté où que vous soyez</p>
            </div>
          </Link>

          <Link to="/shop/porte-cles" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={porteCles} alt="Porte-clés" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">PORTE-CLÉS</h3>
              <p className="text-sm">Emportez votre style partout</p>
            </div>
          </Link>

          <Link to="/shop/carnets" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={carnets} alt="Carnets" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">CARNETS</h3>
              <p className="text-sm">Prenez des notes avec classe</p>
            </div>
          </Link>

          <Link to="/shop/promos" className="relative group transform transition-transform hover:scale-105">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={promos} alt="Promos" className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" loading="lazy" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">PROMOS</h3>
              <p className="text-sm">Offres spéciales et réductions</p>
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

          <Link to="/shop/t-shirts" className="inline-block mt-12">
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
