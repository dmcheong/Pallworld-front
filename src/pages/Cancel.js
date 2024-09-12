import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cancel = () => {
  return (
    <div>
      <Header />
      <section className="container mx-auto text-center py-16">
        <h1 className="text-4xl font-bold mb-8">Commande annulée</h1>
        <p className="text-lg mb-8">Votre paiement a été annulé. Si c'était une erreur, vous pouvez réessayer.</p>
        <Link to="/panier">
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 transition-colors duration-300">
            Retourner au panier
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Cancel;
