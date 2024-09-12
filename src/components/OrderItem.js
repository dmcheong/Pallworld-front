import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">Commande #{order._id}</h3>
      <p className="text-gray-600 mb-2">Date: {new Date(order.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-2">Total: {order.totalAmount} €</p>
      <ul className="list-disc pl-5 text-gray-600">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.productName} - Quantité: {item.quantity} - Prix: {item.price} €
          </li>
        ))}
      </ul>
      {order.imageGenerated && (
        <div className="mt-4">
          <img src={order.imageGenerated} alt="Pal générée" className="w-full h-auto rounded-md" />
        </div>
      )}
    </div>
  );
};

export default OrderItem;
