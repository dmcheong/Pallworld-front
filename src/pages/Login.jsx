import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideImage from '../components/SideImage';
import TextInput from '../components/TextInput';
import FormButton from '../components/FormButton';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/api/users/signin', formData);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirection vers une page protégée
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div>
      <Header />

      <section className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* Left: Image */}
          <SideImage />

          {/* Right: Login Form */}
          <div className="md:w-1/2 p-4">
            <div className="p-4 md:border md:rounded-lg md:shadow-lg flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-center">CONNEXION</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
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
                <Link to="/forgot-password" className="text-sm text-sky-600 hover:underline mt-2 block">
                  Mot de passe oublié ?
                </Link>
                <FormButton text="SE CONNECTER" />
              </form>

              <p className="text-center mt-4 text-sm">
                Pas encore de compte ?{' '}
                <Link to="/inscription" className="text-sky-600 hover:underline">
                  S'inscrire
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

export default Login;
