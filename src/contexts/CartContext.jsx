import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CartContext = createContext();
const DELIVERY_FEE = 0.6;
const FREE_DELIVERY_THRESHOLD = 12.04;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  // Fetch cart from backend on login
  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser) {
        try {
          const response = await fetch(`${API_URL}/api/cart`, {
            credentials: 'include',
          });
          if (response.ok) {
            const data = await response.json();
            // Transform backend cart items to frontend format
            // Backend: { productId, title, price, image, quantity }
            // Frontend expects: { product: { id, title, price, image }, quantity }
            const formattedCart = data.data.items.map(item => ({
              product: {
                id: item.productId,
                title: item.title,
                price: item.price,
                image: item.image
              },
              quantity: item.quantity
            }));
            setCart(formattedCart);
          }
        } catch (error) {
          console.error('Failed to fetch cart', error);
        }
      } else {
        setCart([]);
      }
    };
    fetchCart();
  }, [currentUser]);

  const addToCart = async (product) => {
    // Optimistic update
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

    if (currentUser) {
      try {
        await fetch(`${API_URL}/api/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
          })
        });
      } catch (error) {
        console.error('Failed to add to cart backend', error);
      }
    }
  };

  const removeFromCart = async (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));

    if (currentUser) {
      try {
        await fetch(`${API_URL}/api/cart/remove/${productId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
      } catch (error) {
        console.error('Failed to remove from cart backend', error);
      }
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
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

    if (currentUser) {
      try {
        await fetch(`${API_URL}/api/cart/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            productId,
            quantity: newQuantity
          })
        });
      } catch (error) {
        console.error('Failed to update cart backend', error);
      }
    }
  };

  const clearCart = useCallback(async () => {
    setCart([]);
    if (currentUser) {
      try {
        await fetch(`${API_URL}/api/cart/clear`, {
          method: 'DELETE',
          credentials: 'include'
        });
      } catch (error) {
        console.error('Failed to clear cart backend', error);
      }
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
