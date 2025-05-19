import React from 'react';
import { useCart } from '../contexts/CartContext';
import { getFormattedINRPrice } from '../utils/currency';

const Cart = ({ onClose }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    deliveryFee, 
    total,
    FREE_DELIVERY_THRESHOLD 
  } = useCart();

  return (
    <div 
      style={{
        position: 'fixed',
        top: '60px',
        right: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '300px',
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 1000
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Your Cart</h2>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div 
              key={item.product.id} 
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}
            >
              <img 
                src={item.product.image} 
                alt={item.product.title} 
                style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 5px', fontSize: '14px' }}>
                  {item.product.title.length > 30 
                    ? `${item.product.title.substring(0, 30)}...` 
                    : item.product.title}
                </p>
                <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>
                  {getFormattedINRPrice(item.product.price)}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    style={{
                      padding: '2px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    style={{
                      padding: '2px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.product.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '5px',
                  color: '#999'
                }}
              >
                ×
              </button>
            </div>
          ))}

          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Subtotal:</span>
              <span>{getFormattedINRPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Delivery Fee:</span>
              <span>{deliveryFee === 0 ? 'FREE' : getFormattedINRPrice(deliveryFee)}</span>
            </div>
            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', margin: '10px 0' }}>
                Add {getFormattedINRPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery
              </p>
            )}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '1px solid #eee',
                fontWeight: 'bold'
              }}
            >
              <span>Total:</span>
              <span>{getFormattedINRPrice(total)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;