import React from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './context/CartContext';
import App from './App';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
