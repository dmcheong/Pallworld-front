import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { CartContext } from '../context/CartContext'; // Import du contexte du panier
import logo from '../assets/logos/logo-rect.png';
import SearchBar from './SearchBar';

function Header() {
  const { cart, cartCount } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('token');
    navigate('/');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) => (prevDropdown === dropdown ? null : dropdown));
  };

  return (
    <header className={`border-b sticky top-0 bg-white z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
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
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center space-x-2">
                <FaUser className="text-gray-600 hover:text-gray-800 transition-colors duration-200" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 transition-opacity duration-300">
                  <Link to="/profil" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-200">Profil</Link>
                  <Link to="/historique" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-200">Historique de commande</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200">Déconnexion</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/connexion">
              <FaUser className="text-gray-600 hover:text-gray-800 transition-colors duration-200" />
            </Link>
          )}

          <Link to="/panier" className="relative">
            <FaShoppingCart className="text-gray-600 hover:text-gray-800 transition-colors duration-200" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger Menu Icon */}
          <button
            className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav ref={dropdownRef} className={`border-t ${isMobileMenuOpen ? 'block' : 'hidden'} sm:block transition-all duration-300`}>
        <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-8">
          <Link to="/" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            ACCUEIL
          </Link>

          {/* Textile Dropdown */}
          <div className="relative">
            <button
              className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600 focus:outline-none"
              onClick={() => toggleDropdown('textile')}
            >
              TEXTILE
            </button>
            {activeDropdown === 'textile' && (
              <div className="absolute bg-white border rounded-lg shadow-lg mt-2 w-48 z-10">
                <Link to="/shop/t-shirts" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">T-shirts</Link>
                <Link to="/shop/pulls" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Pulls</Link>
                <Link to="/shop/hoodies" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Hoodies</Link>
                <Link to="/shop/debardeurs" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Débardeurs</Link>
              </div>
            )}
          </div>

          {/* Goodies Dropdown */}
          <div className="relative">
            <button
              className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600 focus:outline-none"
              onClick={() => toggleDropdown('goodies')}
            >
              GOODIES
            </button>
            {activeDropdown === 'goodies' && (
              <div className="absolute bg-white border rounded-lg shadow-lg mt-2 w-48 z-10">
                <Link to="/shop/coques-pour-telephone" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-color">Coques pour téléphone</Link>
                <Link to="/shop/stylos" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Stylos</Link>
                <Link to="/shop/gourdes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Gourdes</Link>
                <Link to="/shop/porte-cles" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Porte-clés</Link>
                <Link to="/shop/carnets" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Carnets</Link>
              </div>
            )}
          </div>

          <Link to="/shop/promos" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            PROMOS
          </Link>
          
          <Link to="/shop/tokens" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            TOKENS
          </Link>

          <Link to="/contact" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            CONTACT
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
