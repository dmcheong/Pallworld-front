import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est authentifié

  return isAuthenticated ? children : <Navigate to="/connexion" />;
};

export default PrivateRoute;
