import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarMenu from '../components/Sidebars/UserSidebar';
import OrderItem from '../components/OrderItem';
import { jwtDecode } from 'jwt-decode';

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openOrderId, setOpenOrderId] = useState(null);
  const ordersPerPage = 5; 

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
  
        const ordersResponse = await axios.get(`http://localhost:${process.env.REACT_APP_PORT_BDD_API}/api/orders/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setOrders(ordersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des commandes :', error);
        setError('Impossible de récupérer les commandes. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };
  
    fetchOrderHistory();
  }, []);
  
  // Calcul des pages
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleOrder = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return <p className="text-center mt-8">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
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
              currentOrders.map((order) => (
                <OrderItem
                  key={order._id}
                  order={order}
                  isOpen={openOrderId === order._id}
                  onToggle={() => handleToggleOrder(order._id)}
                />
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                      index + 1 === currentPage ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'
                    } hover:bg-sky-500 hover:text-white transition-colors duration-300`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  );
};

export default PurchaseHistory;
