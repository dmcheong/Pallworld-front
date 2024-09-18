import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

const Success = () => {
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    updateCart([]);
    localStorage.removeItem('cart');
    
    setTimeout(() => {
      navigate('/historique');
    }, 3000);
  }, [updateCart, navigate]);

  return (
    <div>
      <Header />
      <section className="container mx-auto text-center py-16">
        <h1 className="text-4xl font-bold mb-8">Merci pour votre achat !</h1>
        <p className="text-lg mb-8">Votre commande a été passée avec succès. Vous recevrez un email de confirmation sous peu.</p>
        <Link to="/historique">
          <button className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-800 transition-colors duration-300">
            Voir mon historique de commande
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Success;
