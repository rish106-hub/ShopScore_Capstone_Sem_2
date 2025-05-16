import React from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './context/CartContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </CartProvider>
  </React.StrictMode>
);