import React from 'react';
import AppRouter from './router';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
};

export default App;
