import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  return (
    <div className="p-4 md:border md:rounded-lg md:shadow-lg flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-4 text-center">INSCRIPTION</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Mot de passe <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <button className="w-full bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300">
          S'INSCRIRE
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Vous avez déjà un compte ?{' '}
        <Link to="/connexion" className="text-sky-600 hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
