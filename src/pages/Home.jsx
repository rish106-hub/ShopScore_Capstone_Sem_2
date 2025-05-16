
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { fetchAllProducts } from '../api/productApi';

const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getTopProducts = async () => {
      setIsLoading(true);
      const products = await fetchAllProducts();
      // Sort by rating and get top 8
      const sorted = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 8);
      setTopProducts(sorted);
      setIsLoading(false);
    };
    
    getTopProducts();
  }, []);

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Discover the Best Products</h1>
              <p className="hero-subtitle">Read honest reviews, check ratings, and make informed decisions.</p>
              <Link to="/products" className="btn">Browse Products</Link>
            </div>
          </div>
        </section>
        
        {/* Top Rated Products */}
        <section className="products-section">
          <div className="container">
            <h2 className="section-title">Top Rated Products</h2>
            
            {isLoading ? (
              <p className="text-center">Loading top products...</p>
            ) : (
              <div className="products-grid">
                {topProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => {}} 
                  />
                ))}
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link to="/products" className="btn">View All Products</Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="products-section">
          <div className="container">
            <h2 className="section-title">What Our Users Say</h2>
            
            <div className="products-grid">
              <div className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">Michael Johnson</span>
                  <span className="review-date">March 12, 2023</span>
                </div>
                <p className="review-text">"ShopScore helped me find the perfect laptop. The reviews were detailed and accurate!"</p>
              </div>
              
              <div className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">Sarah Williams</span>
                  <span className="review-date">February 28, 2023</span>
                </div>
                <p className="review-text">"I love how easy it is to browse products and check ratings. This site is a game-changer!"</p>
              </div>
              
              <div className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">David Thompson</span>
                  <span className="review-date">January 15, 2023</span>
                </div>
                <p className="review-text">"The community here is fantastic. Honest reviews have saved me from making bad purchases multiple times."</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
