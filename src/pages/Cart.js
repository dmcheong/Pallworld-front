import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideImage from '../components/SideImage';
import Alert from '../components/Alert';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, updateCart } = useContext(CartContext);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [cartLoaded, setCartLoaded] = useState(false);

  const fetchCart = useCallback(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Panier récupéré du localStorage :', localCart);
    updateCart(localCart);
    setCartLoaded(true);
  }, [updateCart]);

  useEffect(() => {
    if (!cartLoaded) {
      fetchCart();
    }
  }, [cartLoaded, fetchCart]);

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    updateCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setAlertMessage('Article supprimé du panier.');
    setAlertType('success');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (!cartLoaded) {
    return <p>Chargement du panier...</p>;
  }

  return (
    <div>
      <Header />

      <section className="container mx-auto py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl h-full md:h-auto">
          
          {/* Section Image */}
          <SideImage />

          {/* Section Panier */}
          <div className="md:w-3/4 p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-8 text-center">VOTRE PANIER</h2>
            
            {/* Utilisation du composant Alert */}
            {alertMessage && <Alert message={alertMessage} type={alertType} />}

            <ul className="space-y-4">
              {cart.map((product, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      {/* Lien vers la page produit */}
                      <Link to={`/product/${product.productId}`} className="text-gray-700 font-semibold hover:underline">
                        {product.name}
                      </Link>
                      <span className="text-gray-500 text-sm">{product.color} - {product.size}</span>
                      {product.customization && (
                        <>
                          <span className="text-gray-500 text-sm">
                            Personnalisation : {product.customization.position} - {product.customization.customizationSize}
                          </span>

                          <span className="text-gray-500 text-sm">
                            Image générée :
                            {product.customization.imageUrl && (
                            <div className="mt-2">
                              <img
                                src={product.customization.imageUrl}
                                alt="Mon pal"
                                className="w-16 h-16 object-contain border border-gray-300 rounded-lg"
                              />
                            </div>
                          )}
                          </span>
                        </>
                      )}
                      <div className="flex items-center mt-2">
                        <span className="text-black text-md mr-2">Qté :</span>
                        <div className="relative">
                          <select
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value))}
                            className="p-2 pl-4 pr-8 border rounded bg-gray-100 text-gray-700 appearance-none cursor-pointer"
                            style={{
                              backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2htIj0iNCIgdmlld0JveD0iMCAwIDYgNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxbDIgMiAyLjUtMiIgc3Ryb2tlPSIjOEE4QjgwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+)',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 0.5rem center',
                              backgroundSize: '0.65rem auto'
                            }}
                          >
                            {[...Array(10).keys()].map(n => (
                              <option key={n + 1} value={n + 1}>{n + 1}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-semibold mr-4">€{product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => handleRemoveItem(product.productId)} 
                      className="text-red-600 hover:text-red-800 transition-colors duration-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            <hr className="my-6" />

            <div className="flex justify-between items-center text-xl font-semibold">
              <span>TOTAL</span>
              <span>€{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>

            <Link to={cart.length > 0 ? "/finaliser-ma-commande" : "#"}>
              <button
                className={`w-full mt-6 py-2 px-4 rounded transition-colors durée-300 ${
                  cart.length > 0 ? 'bg-sky-600 text-white hover:bg-sky-800' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                disabled={cart.length === 0}
              >
                FINALISER MA COMMANDE
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
