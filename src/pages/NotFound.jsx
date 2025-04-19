
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      
      <main>
        <section className="about-section">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>404</h1>
              <h2 style={{ marginBottom: '30px' }}>Page Not Found</h2>
              <p style={{ marginBottom: '30px' }}>
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link to="/" className="btn">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
