import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ensure light mode if any leftover state exists
  useEffect(() => {
    try {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    } catch { }
  }, []);

  return (
    <header className="header sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-border">
      <div className="container">
        <nav className="navbar flex items-center justify-between py-3">
          <Link to="/" className="logo text-xl font-semibold tracking-tight text-foreground">
            ShopScore
          </Link>

          <button
            className="mobile-toggle md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/80 hover:bg-secondary hover:text-foreground transition"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <ul
            className={`nav-list ${isMenuOpen ? 'active' : ''} hidden md:flex md:items-center gap-2`}
          >
            <li className="nav-item">
              <Link to="/" className="nav-link px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-foreground transition">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-foreground transition">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/submit-review" className="nav-link px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-foreground transition">
                Submit Review
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-foreground transition">
                About
              </Link>
            </li>
            {currentUser ? (
              <li className="nav-item">
                <Button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  size="sm"
                  className="nav-link logout-btn"
                >
                  Logout
                </Button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <Button size="sm" variant="outline">Login</Button>
                </Link>
              </li>
            )}

            {currentUser && (
              <li
                className="nav-item relative flex items-center"
              >
                <button
                  onClick={() => navigate('/cart')}
                  className="relative inline-flex items-center justify-center rounded-md border border-transparent px-2 py-2 text-base hover:bg-secondary transition"
                  aria-label="Cart"
                >
                  <span className="text-xl">🛒</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-xl font-semibold">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-zinc-100 rounded-full"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
              <Link to="/" className="block px-4 py-3 rounded-lg text-lg hover:bg-zinc-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="block px-4 py-3 rounded-lg text-lg hover:bg-zinc-50" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/submit-review" className="block px-4 py-3 rounded-lg text-lg hover:bg-zinc-50" onClick={() => setIsMenuOpen(false)}>Submit Review</Link>
              <Link to="/about" className="block px-4 py-3 rounded-lg text-lg hover:bg-zinc-50" onClick={() => setIsMenuOpen(false)}>About</Link>
            </div>
            <div className="p-4 border-t bg-zinc-50">
              {currentUser ? (
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  size="lg"
                  className="w-full"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button size="lg" className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
