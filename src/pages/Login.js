import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideImage from '../components/Sidebars/SideImage';
import TextInput from '../components/Forms/TextInput';
import FormButton from '../components/Forms/FormButton';
import { FcGoogle } from 'react-icons/fc';
import Alert from '../components/Alert';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alertMessage, setAlertMessage] = useState(''); 
  const [alertType, setAlertType] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:${process.env.REACT_APP_PORT_BDD_API}/api/users/signin`, formData);

      if (response.status === 200) {
        // Stocker l'userId et le token dans le localStorage
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('token', response.data.token);
        navigate('/'); 
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Erreur lors de la connexion');
      setAlertType('error');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:${process.env.REACT_APP_PORT_OAUTH}/auth/google`; 
  };

  return (
    <div>
      <Header />

      <section className="container mx-auto py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl h-full md:h-auto">
          
          {/* Section Image */}
          <SideImage />

          {/* Section Formulaire de Connexion */}
          <div className="md:w-3/4 p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-8 text-center">CONNEXION</h2>
            
            {/* Utilisation du composant Alert */}
            {alertMessage && <Alert message={alertMessage} type={alertType} />}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextInput
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </div>
              <div className="mb-4">
                <TextInput
                  label="Mot de passe"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </div>
              <div className="text-right mb-6">
                <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <FormButton text="SE CONNECTER" />

              <div className="my-4 flex items-center justify-center">
                <hr className="border-gray-300 flex-grow" />
                <span className="text-sm text-gray-500 mx-4">ou</span>
                <hr className="border-gray-300 flex-grow" />
              </div>

              <div className="flex items-center justify-center mb-6">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                >
                  <FcGoogle className="text-2xl mr-2" />
                  <span>Se connecter avec Google</span>
                </button>
              </div>
            </form>

            <p className="text-center mt-4 text-sm">
              Pas encore de compte ?{' '}
              <Link to="/inscription" className="text-blue-500 hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
