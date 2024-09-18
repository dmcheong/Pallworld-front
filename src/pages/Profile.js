import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarMenu from '../components/Sidebars/UserSidebar';
import FormButton from '../components/Forms/FormButton';
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import ProfileModal from '../modals/ProfileModal';
import Alert from '../components/Alert';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token non disponible');
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`http://localhost:3005/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3005/api/users/${userData._id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlertMessage('Votre profil a été mis à jour avec succès.');
      setAlertType('success');
      setModalIsOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      setAlertMessage('Une erreur est survenue lors de la mise à jour du profil.');
      setAlertType('error');
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertMessage("Les nouveaux mots de passe ne correspondent pas.");
      setAlertType('error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3005/api/users/${userData._id}/password`, {
        newPassword: passwordData.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlertMessage('Votre mot de passe a été mis à jour avec succès.');
      setAlertType('success');
      setPasswordData({ newPassword: '', confirmPassword: '' });
      setModalIsOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
      setAlertMessage('Une erreur est survenue lors de la mise à jour du mot de passe.');
      setAlertType('error');
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
      setAlertMessage('Une erreur est survenue lors de la suppression du compte.');
      setAlertType('error');
    }
  };

  const resetUserData = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    axios.get(`http://localhost:3005/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setUserData(response.data);
    }).catch((error) => {
      console.error('Erreur lors du rechargement des données utilisateur :', error);
    });
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

          <Alert message={alertMessage} type={alertType} />

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <FaUser className="text-sky-600 text-2xl mr-4" />
              <h3 className="text-xl font-semibold">Informations personnelles</h3>
            </div>
            <p><strong>Nom :</strong> {userData.lastName}</p>
            <p><strong>Prénom :</strong> {userData.firstName}</p>
            <p><strong>E-mail :</strong> {userData.email}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-sky-600 text-2xl mr-4" />
              <h3 className="text-xl font-semibold">Adresse</h3>
            </div>
            <p><strong>Adresse :</strong> {userData.address}, {userData.city}, {userData.codePostal}, {userData.country}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaPhone className="text-sky-600 text-2xl mr-4" />
              <h3 className="text-xl font-semibold">Coordonnées</h3>
            </div>
            <p><strong>Téléphone :</strong> {userData.phone}</p>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <FormButton
              text="Modifier le profil"
              onClick={() => setModalIsOpen(true)}
              className="w-full md:w-auto"
            />
            <FormButton
              text="Supprimer mon compte"
              onClick={handleDelete}
              color="red"
              className="w-full md:w-auto"
            />
          </div>
        </div>
      </div>

      <Footer />

      <ProfileModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        userData={userData}
        setUserData={setUserData}
        handleSubmit={handleSubmit}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        handlePasswordChange={handlePasswordChange}
        handlePasswordSubmit={handlePasswordSubmit}
        // Ajout de la fonction de réinitialisation après fermeture du modal
        resetUserData={resetUserData}
      />
    </div>
  );
};

export default Profile;
