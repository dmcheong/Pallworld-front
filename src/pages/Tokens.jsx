import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import tokensBanner from '../assets/banners/tokens-banner.jpg';
import { FaShoppingCart } from 'react-icons/fa';
import tokens from '../assets/categories/tokens.jpg';

const Tokens = () => {
  return (
    <div>
      <Header />

      {/* Banner Section */}
      <section className="relative">
        <img
          src={tokensBanner}
          alt="Tokens Banner"
          className="w-full h-[80px] sm:h-[100px] md:h-[150px] lg:h-[200px] object-cover"
        />
      </section>

      {/* Products Section */}
      <section className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg sm:text-xl font-semibold">4 Produits</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 flex flex-col justify-between">
            <img src={tokens} alt="Tokens" className="w-full h-48 object-cover rounded mb-4" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">10 tokens</h3>
                <p className="text-gray-600">€5.99</p>
              </div>
              <button className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300 flex items-center">
                <FaShoppingCart size={16} />
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 flex flex-col justify-between">
            <img src={tokens} alt="Tokens" className="w-full h-48 object-cover rounded mb-4" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">20 tokens</h3>
                <p className="text-gray-600">€10.99</p>
              </div>
              <button className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300 flex items-center">
                <FaShoppingCart size={16} />
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 flex flex-col justify-between">
            <img src={tokens} alt="Tokens" className="w-full h-48 object-cover rounded mb-4" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">50 tokens</h3>
                <p className="text-gray-600">€25.99</p>
              </div>
              <button className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300 flex items-center">
                <FaShoppingCart size={16} />
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 flex flex-col justify-between">
            <img src={tokens} alt="Tokens" className="w-full h-48 object-cover rounded mb-4" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">80 tokens</h3>
                <p className="text-gray-600">€39.99</p>
              </div>
              <button className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300 flex items-center">
                <FaShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-sky-600 text-white py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">UNE QUESTION ?</h2>
        <button className="bg-white text-sky-600 py-3 px-6 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-200 transition-colors duration-300">
          FAQ →
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Tokens;
