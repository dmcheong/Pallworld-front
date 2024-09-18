import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextInput from '../components/Forms/TextInput';
import FormButton from '../components/Forms/FormButton';
import Alert from '../components/Alert';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/api/users/reset-password', { token, password });
      setAlert({ message: 'Mot de passe mis à jour avec succès.', type: 'success' });
      setTimeout(() => {
        navigate('/connexion');
      }, 3000);
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Erreur lors de la mise à jour du mot de passe.', type: 'error' });
    }
  };

  return (
    <div>
      <Header />
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Réinitialiser le mot de passe</h1>
          <p className="text-lg sm:text-xl mt-4">Entrez un nouveau mot de passe pour votre compte.</p>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Nouveau mot de passe</h2>
            <Alert message={alert.message} type={alert.type} />
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Nouveau mot de passe"
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                required
              />
              <div className="flex justify-center mt-6">
                <FormButton text="Mettre à jour le mot de passe" />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResetPassword;
