import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextInput from '../components/Forms/TextInput';
import FormButton from '../components/Forms/FormButton';
import Alert from '../components/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:${process.env.REACT_APP_PORT_BDD_API}/api/users/forgot-password`, { email });
      setAlert({ message: 'Vérifiez votre email pour le lien de réinitialisation.', type: 'success' });
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Erreur lors de la demande.', type: 'error' });
    }
  };

  return (
    <div>
      <Header />
      <section className="relative bg-sky-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Mot de passe oublié</h1>
          <p className="text-lg sm:text-xl mt-4">Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Réinitialiser votre mot de passe</h2>
            <Alert message={alert.message} type={alert.type} />
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Adresse email"
                name="email"
                value={email}
                onChange={handleChange}
                type="email"
                required
              />
              <div className="flex justify-center mt-6">
                <FormButton text="Envoyer le lien" />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
