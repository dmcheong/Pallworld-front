import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextInput from '../components/Forms/TextInput';
import { FaArrowLeft } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const Checkout = () => {
  const { cart, updateCart } = useContext(CartContext);
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/panier');
    }
  }, [cart, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;

          const response = await axios.get(`http://localhost:3005/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const user = response.data;
          setAddress({
            firstName: user.firstName,
            lastName: user.lastName,
            street: user.address, 
            city: user.city,
            postalCode: user.codePostal, 
            phone: user.phone,
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderConfirmation = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
    
      const response = await axios.post('http://localhost:3010/create-checkout-session', {
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          color: item.color,
          size: item.size,
          customizationOptions: item.customization || {},
          amount: Math.round(item.price * 100),
          quantity: item.quantity,
        })),
        userId: decodedToken.userId,
        name: `${address.firstName} ${address.lastName}`,
        street: address.street,
        city: address.city,
        postalCode: address.postalCode, 
        success_url: 'http://localhost:3001/success',
        cancel_url: 'http://localhost:3001/cancel',
      });
      
      window.location.href = response.data.sessionId;
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement :', error);
    }
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <Header />
      <section className="container mx-auto py-8 px-6 flex flex-col md:flex-row justify-between">
        {/* Section Livraison */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-start mb-6">
            <Link to="/panier" className="inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors duration-300 mb-4">
              <FaArrowLeft className="mr-2" /> Retour dans le panier
            </Link>
            <h2 className="text-2xl font-bold">Livraison</h2>
          </div>
          <form className="space-y-4">
            <TextInput
              label="Nom"
              name="lastName"
              value={address.lastName}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="Prénom"
              name="firstName"
              value={address.firstName}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="Adresse"
              name="street"
              value={address.street}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="Complément d'adresse"
              name="addressComplement"
              value={address.addressComplement || ''}
              onChange={handleInputChange}
            />
            <div className="flex space-x-4">
              <TextInput
                label="Ville"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Code Postal"
                name="postalCode"
                value={address.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <TextInput
              label="Numéro de téléphone"
              name="phone"
              value={address.phone}
              onChange={handleInputChange}
              required
            />
          </form>
        </div>

        {/* Section Récapitulatif de la commande */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Ma commande</h2>
          <ul className="space-y-4">
            {cart.map((product, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <Link to={`/product/${product.productId}`} className="text-gray-700 font-semibold hover:underline">
                    {product.name}
                  </Link>
                  <span className="text-gray-500 text-sm">{product.color || 'Couleur non définie'} - {product.size || 'Taille non définie'}</span>
                  {product.customization && (
                    <>
                      <span className="text-gray-500 text-sm">
                        Personnalisation : {product.customization.position || 'Position non définie'} - {product.customization.customizationSize || 'Taille non définie'}
                      </span>

                      {product.customization.imageUrl && (
                        <div className="mt-2">
                          <img
                            src={product.customization.imageUrl}
                            alt="Mon pal"
                            className="w-16 h-16 object-contain border border-gray-300 rounded-lg"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 font-semibold mr-4">€{product.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          
          <hr className="my-6" />

          <div className="text-lg font-bold flex justify-between">
            <span>Total :</span>
            <span>€{calculateTotal()}</span>
          </div>
          <button
            className="mt-6 w-full bg-sky-600 text-white py-3 px-4 rounded hover:bg-sky-700 transition-colors duration-300"
            onClick={handleOrderConfirmation}
          >
            PASSER AU PAIEMENT
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
