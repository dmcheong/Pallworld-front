import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    setCartCount(savedCart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);  
  
  const updateCart = (newCart) => {
    setCart(newCart);
    setCartCount(newCart.reduce((sum, item) => sum + item.quantity, 0));
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item.productId === product.productId);

    if (productIndex >= 0) {
      updatedCart[productIndex].quantity += 1;
    } else {
      const price = product.discountPrice ? product.discountPrice : product.price;
      updatedCart.push({ ...product, price });
    }
    
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, updateCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
