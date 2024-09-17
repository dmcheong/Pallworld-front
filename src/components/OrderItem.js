import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const OrderItem = ({ order, isOpen, onToggle }) => {
  const orderNumber = order._id.substring(0, 8);

  return (
    <div className="bg-white shadow-md rounded-lg mb-4">
      <div
        className="border-b border-gray-200 py-4 px-4 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div>
          <h3 className="font-semibold text-xl text-gray-700">Commande #{orderNumber}</h3>
          <p className="text-sm text-gray-500">
            Date : {new Date(order.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div>
          {isOpen ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="px-4 pb-4">
          <h4 className="text-lg font-semibold text-sky-600 mt-4">Détails de la commande :</h4>
          <ul className="mt-2 space-y-4">
            {order.items.map((item, index) => (
              <li key={index} className="border-t pt-4 border-gray-200">
              {item.isTokenPurchase ? (
                <div className="space-y-2">
                  <p className="text-lg font-bold text-gray-800">
                    {item.tokensQuantity} Token{item.tokensQuantity > 1 ? 's' : ''}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Prix total : <span className="font-medium text-gray-700">€{(item.price * item.tokensQuantity).toFixed(2)}</span>
                  </p>
                </div>
              ) : (
                item.productId && item.productId.name ? (
                  <div className="space-y-2">
                    <Link to={`/product/${item.productId._id}`} className="text-lg font-bold text-gray-800 hover:text-sky-600 transition-colors duration-300">
                      {item.productId.name}
                    </Link>
                    <p className="text-gray-500 text-sm">
                      Couleur : <span className="font-medium text-gray-700">{item.color}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Taille : <span className="font-medium text-gray-700">{item.size}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Quantité : <span className="font-medium text-gray-700">{item.quantity}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Prix par article : <span className="font-medium text-gray-700">€{item.price.toFixed(2)}</span>
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-500">Produit non disponible</span>
                )
              )}
              </li>            
            ))}
          </ul>

          <div className="border-t mt-4 pt-4">
            <p className="text-lg font-semibold text-gray-800">
              Prix total de la commande : <span className="text-sky-600">€{order.totalAmount.toFixed(2)}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
