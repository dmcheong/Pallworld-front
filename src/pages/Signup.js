import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideImage from '../components/SideImage';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import FormButton from '../components/FormButton';
import Alert from '../components/Alert'; // Importation du composant Alert

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

  const [alertMessage, setAlertMessage] = useState(''); // Message d'alerte
  const [alertType, setAlertType] = useState(''); // Type d'alerte (success, error)
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
        setAlertMessage('Inscription réussie. Redirection vers la page de connexion.');
        setAlertType('success');
        setTimeout(() => {
          navigate('/connexion'); // Redirection vers la page de connexion
        }, 2000); // Redirige après 2 secondes
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Erreur lors de l\'inscription');
      setAlertType('error');
    }
  };

  return (
    <div>
      <Header />

      <section className="container mx-auto py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl h-full md:h-auto">
          
          {/* Section Image */}
          <SideImage />

          {/* Section Formulaire d'Inscription */}
          <div className="md:w-3/4 p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-8 text-center">INSCRIPTION</h2>
            
            {/* Utilisation du composant Alert */}
            <Alert message={alertMessage} type={alertType} />

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
              <Link to="/connexion" className="text-blue-500 hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Signup;
