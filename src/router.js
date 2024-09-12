import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel'; 
import Login from './pages/Login';
import Signup from './pages/Signup';
import Faq from './pages/Faq';
import Retour from './pages/Return';
import Shipping from './pages/Shipping';
import Contact from './pages/Contact';
import Profil from './pages/Profile';
import PurchaseHistory from './pages/PurchaseHistory';
import PrivateRoute from './components/PrivateRoute';
import AuthHandler from './components/AuthHandler';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductDetails from './pages/ProductDetails';

const AppRouter = () => {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/verifier-mon-compte" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} /> 
        <Route path="/faq" element={<Faq />} />
        <Route path="/politique-de-retour" element={<Retour />} />
        <Route path="/livraison" element={<Shipping />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route
          path="/historique"
          element={
            <PrivateRoute>
              <PurchaseHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/finaliser-ma-commande"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
