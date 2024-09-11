import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    setCartCount(storedCart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    setCartCount(newCart.reduce((sum, item) => sum + item.quantity, 0));
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
