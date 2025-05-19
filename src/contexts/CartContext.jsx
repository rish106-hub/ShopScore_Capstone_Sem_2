import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CartContext = createContext();
const DELIVERY_FEE = 0.6;
const FREE_DELIVERY_THRESHOLD = 12.04;

const getCartKey = (userId) => `cart_${userId || 'guest'}`;

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (currentUser) {
      const cartKey = getCartKey(currentUser.uid);
      const stored = localStorage.getItem(cartKey);
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (err) {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const cartKey = getCartKey(currentUser.uid);
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = useCallback(() => {
    setCart([]);
    if (currentUser) {
      const cartKey = getCartKey(currentUser.uid);
      localStorage.removeItem(cartKey);
    }
  }, [currentUser]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  const deliveryFee = subtotal >= 12.04 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider 
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        total,
        FREE_DELIVERY_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
