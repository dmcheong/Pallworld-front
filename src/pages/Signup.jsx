import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideImage from '../components/SideImage';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import FormButton from '../components/FormButton';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    codePostal: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const europeanCountries = [
    "Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre",
    "Croatie", "Danemark", "Espagne", "Estonie", "Finlande",
    "France", "Grèce", "Hongrie", "Irlande", "Italie",
    "Lettonie", "Lituanie", "Luxembourg", "Malte", "Pays-Bas",
    "Pologne", "Portugal", "République tchèque", "Roumanie",
    "Slovaquie", "Slovénie", "Suède"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/api/users/signup', formData);

      if (response.status === 201) {
        navigate('/connexion'); // Redirection vers la page de connexion
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div>
      <Header />

      <section className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* Left: Image */}
          <SideImage />

          {/* Right: Signup Form */}
          <div className="md:w-1/2 p-4">
            <div className="p-4 md:border md:rounded-lg md:shadow-lg flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-center">INSCRIPTION</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Nom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    label="Prénom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    label="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                  />
                  <TextInput
                    label="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                  />
                  <TextInput
                    label="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <SelectInput
                    label="Pays"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={europeanCountries}
                    required
                  />
                  <TextInput
                    label="Adresse"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Ville"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Code Postal"
                    name="codePostal"
                    value={formData.codePostal}
                    onChange={handleChange}
                    className="md:col-span-2"
                  />
                </div>
                <FormButton text="S'INSCRIRE" />
              </form>

              <p className="text-center mt-4 text-sm">
                Vous avez déjà un compte ?{' '}
                <Link to="/connexion" className="text-sky-600 hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Signup;
