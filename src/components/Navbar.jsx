import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">ShopScore</Link>
          
          <button className="mobile-toggle" onClick={toggleMenu}>
            ☰
          </button>
          
          <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/submit-review" className="nav-link">Submit Review</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            {currentUser ? (
              <li className="nav-item">
                <button 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }} 
                  className="nav-link logout-btn"
                  style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            )}
            {currentUser && (
              <li 
                className="nav-item" 
                onClick={() => setIsCartOpen(!isCartOpen)}
                style={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '20px', marginRight: '5px' }}>🛒</span>
                {cartCount > 0 && (
                  <span style={{
                    backgroundColor: '#ff4444',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px'
                  }}>
                    {cartCount}
                  </span>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Navbar;
