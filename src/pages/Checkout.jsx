import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = () => {
  const navigate = useNavigate();

  const handleOrderConfirmation = () => {
    // Logique pour finaliser la commande
    // Après confirmation, vous pouvez rediriger l'utilisateur vers la page de l'historique des commandes
    navigate('/historique');
  };

  return (
    <div>
      <Header />
      <section className="container mx-auto py-8">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h1 className="text-3xl font-bold mb-4">Finaliser ma commande</h1>
          {/* Détails de la commande */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Détails de la commande</h2>
            {/* Ici, affichez les détails du panier et du total */}
          </div>
          <button
            className="w-full bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300"
            onClick={handleOrderConfirmation}
          >
            CONFIRMER MA COMMANDE
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
