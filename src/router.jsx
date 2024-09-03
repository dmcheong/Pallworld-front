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
import Support from './pages/Support';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/finaliser-ma-commande" element={<Checkout />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/politique-de-retour" element={<Retour />} />
        <Route path="/livraison" element={<Shipping />} />
        <Route path="/support-client" element={<Support />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
