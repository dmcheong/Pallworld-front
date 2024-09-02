import React, { useState } from 'react';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nom
        </label>
        <input
          name="name"
          type="text"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-600"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-600"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
          Motif
        </label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-600"
          required
        >
          <option value="" disabled hidden>Choisissez un motif</option>
          <option value="commande">Problème avec une commande</option>
          <option value="produit">Question sur un produit</option>
          <option value="compte">Problème de compte</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-600"
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
};

export default SupportForm;
