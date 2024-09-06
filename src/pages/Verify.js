import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Verify = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://localhost:3005/api/users/verify', { token });
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/connexion'); // Redirige vers la page de connexion après un délai
        }, 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Échec de la vérification.');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('Token de vérification manquant.');
    }
  }, [token, navigate]);

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Vérification du compte</h1>
          <p className="text-lg sm:text-xl mt-4">Merci de vérifier votre email pour continuer.</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Statut de la vérification</h2>
            <p className="text-center text-gray-700">{message}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Verify;
