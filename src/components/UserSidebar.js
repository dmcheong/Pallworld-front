import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaHistory, FaBars, FaSignOutAlt, FaImages } from 'react-icons/fa';

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };
  

  return (
    <div className="md:w-64 w-full">
      {/* Bouton pour afficher/masquer le menu sur petits écrans */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-between bg-sky-600 text-white p-4 rounded-lg shadow-md w-full"
      >
        <span>Menu</span>
        <FaBars />
      </button>

      {/* Menu qui se déroule sur petits écrans */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0 bg-white p-4 rounded-lg shadow-md`}>
        <nav className="space-y-4">
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              `flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition ${
                isActive ? 'font-bold text-sky-600' : ''
              }`
            }
          >
            <FaUser className="mr-3" />
            Mon profil
          </NavLink>

          <NavLink
            to="/historique"
            className={({ isActive }) =>
              `flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition ${
                isActive ? 'font-bold text-sky-600' : ''
              }`
            }
          >
            <FaHistory className="mr-3" />
            Historique de commandes
          </NavLink>

          <NavLink
            to="/mes-images"
            className={({ isActive }) =>
              `flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition ${
                isActive ? 'font-bold text-sky-600' : ''
              }`
            }
          >
            <FaImages className="mr-3" /> {/* Utiliser l'icône FaImages */}
            Historique des images générées
          </NavLink>

          {/* Bouton de déconnexion */}
          <button
            onClick={handleLogout}
            className="flex items-center p-2 text-red-600 hover:bg-gray-100 rounded-lg transition w-full"
          >
            <FaSignOutAlt className="mr-3" />
            Se déconnecter
          </button>
        </nav>
      </div>
    </div>
  );
};

export default UserSidebar;
