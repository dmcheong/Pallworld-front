import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarMenu from '../components/UserSidebar';
import OrderItem from '../components/OrderItem';
import { jwtDecode } from 'jwt-decode';  // Assure-toi que l'import est correct

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token non disponible');
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`http://localhost:3005/api/users/${userId}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des commandes :', error);
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Chargement...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row flex-1">
        <SidebarMenu />

        <div className="flex-1 mt-6 md:mt-0 md:ml-8">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-sky-600">Historique de commandes</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            {orders.length === 0 ? (
              <p className="text-gray-600">Vous n'avez pas encore passé de commande.</p>
            ) : (
              orders.map((order) => <OrderItem key={order._id} order={order} />)
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PurchaseHistory;
