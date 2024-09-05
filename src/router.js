import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
// import ProductDetails from './pages/ProductDetails';
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

const AppRouter = () => {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/panier" element={<Cart />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
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
