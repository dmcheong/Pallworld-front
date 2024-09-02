import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="text-black py-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        <div className="text-center sm:text-left">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-24 sm:h-36 mx-auto sm:mx-0 mb-4" 
          />
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-2">PRODUITS</h3>
          <ul>
            <li>
              <Link to="/shop/textile" className="hover:underline hover:font-semibold">
                Textile
              </Link>
            </li>

            <li>
              <Link to="/shop/goodies" className="hover:underline hover:font-semibold">
                Goodies
              </Link>
            </li>

            <li>
              <Link to="/shop/promos" className="hover:underline hover:font-semibold">
                Promos
              </Link>
            </li>

            <li>
              <Link to="/tokens" className="hover:underline hover:font-semibold">
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

      <div className="container mx-auto">
        <hr className="my-4"/>
        <p className="pt-2 font-semibold text-center sm:text-left">&copy; 2023 Palworld E-shop. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
