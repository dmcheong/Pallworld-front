import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/logos/logo-rect.png';
import SearchBar from './SearchBar';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Threshold for changing the logo
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left: Search Icon */}
        <div className="flex items-center flex-1">
          <SearchBar />
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center flex-1">
          <Link to="/">
            <img 
              src={logo} 
              alt="Logo"
              className={`transition-all duration-300 ${isScrolled ? 'h-12 sm:h-16' : 'h-16 sm:h-20'}`}
            />
          </Link>
        </div>

        {/* Right: User and Cart icons */}
        <div className="flex items-center justify-end flex-1 space-x-4">
          <Link to="/connexion">
            <FaUser className="text-gray-600 hover:text-gray-800" />
          </Link>

          <Link to="/panier">
            <FaShoppingCart className="text-gray-600 hover:text-gray-800" />
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="border-t">
        <div className="container mx-auto px-4 py-2 flex justify-center sm:justify-center space-x-4 sm:space-x-8">
          <Link to="/" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            ACCUEIL
          </Link>

          <Link to="/shop/textile" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            TEXTILE
          </Link>

          <Link to="/shop/goodies" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            GOODIES
          </Link>

          <Link to="/shop/promos" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            PROMOS
          </Link>
          
          <Link to="/shop/tokens" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            TOKENS
          </Link>

          <Link to="/support-client" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            CONTACT
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
