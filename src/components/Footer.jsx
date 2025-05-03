
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">ShopScore</h3>
            <p>Your trusted source for honest product reviews and ratings.</p>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link"><Link to="/">Home</Link></li>
              <li className="footer-link"><Link to="/products">Products</Link></li>
              <li className="footer-link"><Link to="/submit-review">Submit Review</Link></li>
              <li className="footer-link"><Link to="/about">About</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-links">
              <li className="footer-link">Email: rishavdewan10@gmail.com</li>
              <li className="footer-link">Phone: 9749452397</li>
              <li className="footer-link">Address: Rishihood University</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          &copy; {currentYear} ShopScore. All rights reserved. Created for WAP Capstone.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
