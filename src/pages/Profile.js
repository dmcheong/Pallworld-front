import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarMenu from '../components/UserSidebar';
import TextInput from '../components/TextInput';
import FormButton from '../components/FormButton';

const Profile = () => {
  const [userData, setUserData] = useState(null); // Initialise avec null
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const europeanCountries = [
    "Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre", "Croatie", "Danemark",
    "Espagne", "Estonie", "Finlande", "France", "Grèce", "Hongrie", "Irlande", "Italie",
    "Lettonie", "Lituanie", "Luxembourg", "Malte", "Pays-Bas", "Pologne", "Portugal",
    "République tchèque", "Roumanie", "Slovaquie", "Slovénie", "Suède"
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token non disponible');
        }

        // Effectue une requête API pour récupérer les informations utilisateur à partir du token
        const response = await axios.get(`http://localhost:3005/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3005/api/users/${userData._id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Votre profil a été mis à jour avec succès.');
      navigate('/profil');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      alert('Une erreur est survenue lors de la mise à jour du profil.');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3005/api/users/${userData._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem('token');
      navigate('/connexion');
    } catch (error) {
      console.error('Erreur lors de la suppression du compte :', error);
      alert('Une erreur est survenue lors de la suppression du compte.');
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Chargement...</p>;
  }

  if (!userData) {
    return <p className="text-center mt-8">Aucune donnée utilisateur disponible.</p>;
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <SidebarMenu />

        <div className="flex-1 mt-6 md:mt-0 md:ml-8">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-sky-600">Mon profil</h2>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextInput
                label="Nom"
                name="lastName"
                value={userData.lastName || ''}
                onChange={handleInputChange}
              />
              <TextInput
                label="Prénom"
                name="firstName"
                value={userData.firstName || ''}
                onChange={handleInputChange}
              />
              <TextInput
                label="E-mail"
                name="email"
                value={userData.email || ''}
                onChange={handleInputChange}
                type="email"
              />
              <TextInput
                label="Téléphone"
                name="phone"
                value={userData.phone || ''}
                onChange={handleInputChange}
              />
              <TextInput
                label="Adresse"
                name="address"
                value={userData.address || ''}
                onChange={handleInputChange}
                className="md:col-span-2"
              />
              <TextInput
                label="Ville"
                name="city"
                value={userData.city || ''}
                onChange={handleInputChange}
              />
              <TextInput
                label="Code Postal"
                name="codePostal"
                value={userData.codePostal || ''}
                onChange={handleInputChange}
              />
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Pays
                </label>
                <select
                  name="country"
                  value={userData.country || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Sélectionnez votre pays</option>
                  {europeanCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <FormButton text="Mettre à jour" />
              <FormButton text="Supprimer mon compte" type="button" onClick={handleDelete} color="red" />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
