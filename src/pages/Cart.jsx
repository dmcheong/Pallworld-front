import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import panierImage from '../assets/pals.jpg';

const Panier = () => {
  return (
    <div>
      <Header />

      <section className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* Left: Image */}
          <div className="md:w-1/2 p-4 hidden md:flex items-center">
            <img 
              src={panierImage} 
              alt="Panier" 
              className="w-full h-auto max-h-[415px] min-h-[200px] object-cover rounded-lg" 
            />
          </div>

          {/* Right: Cart Details */}
          <div className="md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 flex items-center">
              PANIER <span className="ml-4"><i className="fas fa-shopping-cart"></i></span>
            </h1>
            <ul className="space-y-4">
              {/* Example Product Items */}
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Nom du produit</span>
                <span className="text-gray-700">€XX.XX</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Nom du produit</span>
                <span className="text-gray-700">€XX.XX</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Nom du produit</span>
                <span className="text-gray-700">€XX.XX</span>
              </li>
            </ul>

            <hr className="my-6" />

            <div className="flex justify-between items-center text-xl font-semibold">
              <span>TOTAL</span>
              <span>€XX.XX</span>
            </div>

            <Link to="/finaliser-ma-commande">
              <button className="w-full mt-6 bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300">
                FINALISER MA COMMANDE
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Panier;
