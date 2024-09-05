import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    if (token) {
      console.log("Token récupéré:", token); // Affiche le token dans la console
      localStorage.setItem('token', token);
      navigate('/'); // Redirige vers la page d'accueil après la connexion
    }
  }, [navigate]);

  return null;
};

export default AuthHandler;
