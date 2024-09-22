import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/logo-rect.png';

const Footer = () => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  
  return (
    <footer className="text-black py-8 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="text-center sm:text-left">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-auto max-h-20 sm:max-h-28 w-auto mx-auto sm:mx-0 mb-4 transition-transform duration-300 hover:scale-105" 
          />
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-2">PRODUITS</h3>
          <ul>
            <li>
              <Link to="/shop/promos" className="hover:underline hover:font-semibold transition-colors duration-300">
                Promos
              </Link>
            </li>

            {isAuthenticated && (
              <li>
                <Link to="/tokens" className="hover:underline hover:font-semibold transition-colors duration-300">
                  Tokens
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-2">SUPPORT</h3>
          <ul>
            <li>
              <Link to="/faq" className="hover:underline hover:font-semibold transition-colors duration-300">
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/livraison" className="hover:underline hover:font-semibold transition-colors duration-300">
                Livraison
              </Link>
            </li>

            <li>
              <Link to="/politique-de-retour" className="hover:underline hover:font-semibold transition-colors duration-300">
                Politique de retour
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:underline hover:font-semibold transition-colors duration-300">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-2">ADRESSE</h3>
          <ul>
            <li className="flex items-center justify-center sm:justify-start">
              <span>12 Rue Anatole France, 92000 Nanterre, France</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <hr className="my-4" />
        <div className="flex justify-center sm:justify-between items-center text-center sm:text-left">
          <p className="pt-2 font-semibold">&copy; 2024 Palworld E-shop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
