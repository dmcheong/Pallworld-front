import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaYahoo } from 'react-icons/fa';

const LoginForm = () => {
  return (
    <div className="p-4 md:border md:rounded-lg md:shadow-lg flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-4 text-center">CONNEXION</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
          <Link to="/forgot-password" className="text-sm text-sky-600 hover:underline mt-2 block">
            Mot de passe oublié
          </Link>
        </div>

        <button className="w-full bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300">
          SE CONNECTER
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">ou</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="text-red-600 hover:text-red-800">
            <FaGoogle size={24} />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <FaFacebook size={24} />
          </button>
          <button className="text-purple-600 hover:text-purple-800">
            <FaYahoo size={24} />
          </button>
        </div>
      </div>

      <p className="text-center mt-4 text-sm">
        Pas encore de compte ?{' '}
        <Link to="/signup" className="text-sky-600 hover:underline">
          S'inscrire
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
