import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-black py-8 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        <div className="text-center sm:text-left">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-20 sm:h-28 mx-auto sm:mx-0 mb-4 transition-transform duration-300 hover:scale-105" 
          />
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-2">PRODUITS</h3>
          <ul>
            <li>
              <Link to="/shop/textile" className="hover:underline hover:font-semibold transition-colors duration-300">
                Textile
              </Link>
            </li>
            <li>
              <Link to="/shop/goodies" className="hover:underline hover:font-semibold transition-colors duration-300">
                Goodies
              </Link>
            </li>
            <li>
              <Link to="/shop/promos" className="hover:underline hover:font-semibold transition-colors duration-300">
                Promos
              </Link>
            </li>
            <li>
              <Link to="/tokens" className="hover:underline hover:font-semibold transition-colors duration-300">
                Tokens
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-2">SUPPORT</h3>
          <ul>
            <li>FAQ</li>
            <li>Support client</li>
            <li>SAV</li>
            <li>Chat en direct</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <hr className="my-4"/>
        <div className="flex justify-between items-center text-center sm:text-left">
          <p className="pt-2 font-semibold">&copy; 2023 Palworld E-shop. Tous droits réservés.</p>
          <div className="flex space-x-4">
            <FaFacebook className="text-gray-600 hover:text-blue-600 transition-colors duration-300" />
            <FaTwitter className="text-gray-600 hover:text-blue-400 transition-colors duration-300" />
            <FaInstagram className="text-gray-600 hover:text-pink-600 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
