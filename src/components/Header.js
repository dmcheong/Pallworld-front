import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logos/logo-rect.png';
import SearchBar from './SearchBar';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isTextileDropdownOpen, setIsTextileDropdownOpen] = useState(false);
  const [isGoodiesDropdownOpen, setIsGoodiesDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const navigate = useNavigate();

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/connexion');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  const handleMouseEnter = (setDropdownOpen) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = (setDropdownOpen) => {
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Petit délai avant de fermer le dropdown
    setDropdownTimeout(timeout);
  };

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
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center space-x-2">
                <FaUser className="text-gray-600 hover:text-gray-800" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                  <Link to="/profil" className="block px-4 py-2 hover:bg-gray-200">Profil</Link>
                  <Link to="/historique" className="block px-4 py-2 hover:bg-gray-200">Historique de commande</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200">Déconnexion</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/connexion">
              <FaUser className="text-gray-600 hover:text-gray-800" />
            </Link>
          )}

          <Link to="/panier">
            <FaShoppingCart className="text-gray-600 hover:text-gray-800" />
          </Link>

          {/* Hamburger Menu Icon */}
          <button
            className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Links - Hidden on small screens */}
      <nav className={`border-t ${isMobileMenuOpen ? 'block' : 'hidden'} sm:block`}>
        <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-8">
          <Link to="/" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600">
            ACCUEIL
          </Link>

          {/* Textile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setIsTextileDropdownOpen)}
            onMouseLeave={() => handleMouseLeave(setIsTextileDropdownOpen)}
          >
            <button className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600 focus:outline-none">
              TEXTILE
            </button>
            {isTextileDropdownOpen && (
              <div 
                className="absolute bg-white border rounded shadow-lg mt-2 w-48 z-10"
                onMouseEnter={() => handleMouseEnter(setIsTextileDropdownOpen)}
                onMouseLeave={() => handleMouseLeave(setIsTextileDropdownOpen)}
              >
                <Link to="/shop/t-shirts" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">T-shirts</Link>
                <Link to="/shop/pulls" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Pulls</Link>
                <Link to="/shop/hoodies" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Hoodies</Link>
                <Link to="/shop/debardeurs" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Débardeurs</Link>
              </div>
            )}
          </div>

          {/* Goodies Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setIsGoodiesDropdownOpen)}
            onMouseLeave={() => handleMouseLeave(setIsGoodiesDropdownOpen)}
          >
            <button className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600 focus:outline-none">
              GOODIES
            </button>
            {isGoodiesDropdownOpen && (
              <div 
                className="absolute bg-white border rounded shadow-lg mt-2 w-48 z-10"
                onMouseEnter={() => handleMouseEnter(setIsGoodiesDropdownOpen)}
                onMouseLeave={() => handleMouseLeave(setIsGoodiesDropdownOpen)}
              >
                <Link to="/shop/coque-pour-telephone" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Coques pour téléphone</Link>
                <Link to="/shop/stylos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Stylos</Link>
                <Link to="/shop/gourdes" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Gourdes</Link>
                <Link to="/shop/porte-clés" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Porte-clés</Link>
                <Link to="/shop/carnets" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Carnets</Link>
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
