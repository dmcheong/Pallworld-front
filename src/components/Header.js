import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import logo from '../assets/logos/logo-rect.png';
import SearchBar from './SearchBar';

function Header() {
  const { cartCount } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isAuthenticated = !!localStorage.getItem('token');

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
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) => (prevDropdown === dropdown ? null : dropdown));
  };

  const handleLogout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest('a')
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`border-b sticky top-0 bg-white text-black z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center flex-1">
          <SearchBar />
        </div>

        <div className="flex justify-center flex-1">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 ${isScrolled ? 'h-12 sm:h-16' : 'h-16 sm:h-20'}`}
            />
          </Link>
        </div>

        <div className="flex items-center justify-end flex-1 space-x-4">
          {!isMobileMenuOpen && (
            <>
              {isAuthenticated ? (
                <div className="relative hidden sm:block">
                  <button onClick={() => toggleDropdown('user')} className="flex items-center space-x-2">
                    <FaUser className="text-gray-600 hover:text-black transition-colors duration-200" />
                  </button>
                  {activeDropdown === 'user' && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 transition-opacity duration-300"
                    >
                      <Link to="/profil" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-200" onClick={handleLinkClick}>Profil</Link>
                      <Link to="/historique" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-200" onClick={handleLinkClick}>Historique de commande</Link>
                      <Link to="/mes-images" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-200" onClick={handleLinkClick}>Historique des images générées</Link>
                      <button onClick={() => { handleLogout(); handleLinkClick(); }} className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200">Déconnexion</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/connexion" className="hidden sm:block" onClick={handleLinkClick}>
                  <FaUser className="text-gray-600 hover:text-black transition-colors duration-200" />
                </Link>
              )}

              {isAuthenticated && (
                <Link to="/panier" className="relative hidden sm:block" onClick={handleLinkClick}>
                  <FaShoppingCart className="text-gray-600 hover:text-black transition-colors duration-200" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </>
          )}

          <div className="sm:hidden">
            <button
              className="text-gray-600 hover:text-black focus:outline-none duration-200"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white text-black p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <img src={logo} alt="Logo" className="h-12" />
            <button onClick={toggleMobileMenu}>
              <FaTimes size={24} />
            </button>
          </div>

          <nav className="space-y-4">
            <button className="flex justify-between items-center w-full" onClick={() => toggleDropdown('textile')}>
              TEXTILE {activeDropdown === 'textile' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {activeDropdown === 'textile' && (
              <div className="ml-4 space-y-2 z-50 relative">
                <Link to="/shop/t-shirts" className="block" onClick={handleLinkClick}>T-Shirts</Link>
                <Link to="/shop/pulls" className="block" onClick={handleLinkClick}>Pulls</Link>
                <Link to="/shop/hoodies" className="block" onClick={handleLinkClick}>Hoodies</Link>
                <Link to="/shop/debardeurs" className="block" onClick={handleLinkClick}>Débardeurs</Link>
              </div>
            )}

            <button className="flex justify-between items-center w-full" onClick={() => toggleDropdown('goodies')}>
              GOODIES {activeDropdown === 'goodies' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {activeDropdown === 'goodies' && (
              <div className="ml-4 space-y-2 z-50 relative">
                <Link to="/shop/coques-pour-telephone" className="block" onClick={handleLinkClick}>Coques pour téléphone</Link>
                <Link to="/shop/stylos" className="block" onClick={handleLinkClick}>Stylos</Link>
                <Link to="/shop/gourdes" className="block" onClick={handleLinkClick}>Gourdes</Link>
                <Link to="/shop/porte-cles" className="block" onClick={handleLinkClick}>Porte-clés</Link>
                <Link to="/shop/carnets" className="block" onClick={handleLinkClick}>Carnets</Link>
              </div>
            )}

            <Link to="/promos" className="block" onClick={handleLinkClick}>PROMOS</Link>

            {isAuthenticated && (
              <Link to="/tokens" className="block" onClick={handleLinkClick}>TOKENS</Link>
            )}

            <Link to="/contact" className="block" onClick={handleLinkClick}>CONTACT</Link>

            {isAuthenticated ? (
              <div>
                <button className="flex justify-between items-center w-full" onClick={() => toggleDropdown('user')}>
                  MON COMPTE {activeDropdown === 'user' ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {activeDropdown === 'user' && (
                  <div className="ml-4 mt-4 space-y-2 z-50 relative">
                    <Link to="/profil" className="block" onClick={handleLinkClick}>Profil</Link>
                    <Link to="/historique" className="block" onClick={handleLinkClick}>Historique de commande</Link>
                    <Link to="/mes-images" className="block" onClick={handleLinkClick}>Historique des images générées</Link>
                    <button onClick={() => { handleLogout(); handleLinkClick(); }} className="w-full text-left">Déconnexion</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/connexion" className="flex items-center" onClick={handleLinkClick}>
                <FaUser className="mr-2" /> CONNEXION
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/panier" className="flex items-center" onClick={handleLinkClick}>
                <FaShoppingCart className="mr-2" /> PANIER
                {cartCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </nav>
        </div>
      )}

      <nav ref={dropdownRef} className={`border-t hidden sm:block transition-all duration-300`}>
        <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-8">
          <Link to="/" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600" onClick={handleLinkClick}>
            ACCUEIL
          </Link>

          <div className="relative">
            <button
              className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600 focus:outline-none flex items-center"
              onClick={() => toggleDropdown('textile')}
            >
              TEXTILE 
            </button>
            {activeDropdown === 'textile' && (
              <div className="absolute bg-white text-black rounded-lg shadow-lg mt-2 w-64 z-50">
                <Link to="/shop/t-shirts" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>T-Shirts</Link>
                <Link to="/shop/pulls" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Pulls</Link>
                <Link to="/shop/hoodies" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Hoodies</Link>
                <Link to="/shop/debardeurs" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Débardeurs</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600 focus:outline-none flex items-center"
              onClick={() => toggleDropdown('goodies')}
            >
              GOODIES
            </button>
            {activeDropdown === 'goodies' && (
              <div className="absolute bg-white text-black rounded-lg shadow-lg mt-2 w-64 z-50">
                <Link to="/shop/coques-pour-telephone" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Coques pour téléphone</Link>
                <Link to="/shop/stylos" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Stylos</Link>
                <Link to="/shop/gourdes" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Gourdes</Link>
                <Link to="/shop/porte-cles" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Porte-clés</Link>
                <Link to="/shop/carnets" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>Carnets</Link>
              </div>
            )}
          </div>

          <Link to="/promos" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600" onClick={handleLinkClick}>
            PROMOS
          </Link>

          {isAuthenticated && (
            <Link to="/tokens" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600" onClick={handleLinkClick}>
              TOKENS
            </Link>
          )}

          <Link to="/contact" className="text-sm sm:text-base hover:underline hover:font-medium hover:text-sky-600" onClick={handleLinkClick}>
            CONTACT
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
