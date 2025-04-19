
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      
      <main>
        <section className="about-section">
          <div className="container">
            <h1 className="section-title">About ShopScore</h1>
            
            <div className="about-content">
              <h2>Our History</h2>
              <p>
                ShopScore was founded in 2023 as a capstone project for the Web Applications Programming course. 
                The goal was to create a platform where users could find honest reviews and ratings for products 
                they're interested in purchasing.
              </p>
              <p>
                What started as a simple academic project has evolved into a comprehensive resource for consumers 
                looking to make informed purchase decisions based on real user experiences.
              </p>
              
              <h2 style={{ marginTop: '30px' }}>Our Mission</h2>
              <p>
                At ShopScore, our mission is to empower consumers with transparent, honest, and detailed product 
                reviews. We believe that every shopper deserves access to reliable information before making a purchase.
              </p>
              <p>
                By fostering a community of honest reviewers, we aim to create a trustworthy ecosystem where both 
                consumers and quality products can thrive.
              </p>
              
              <h2 style={{ marginTop: '30px' }}>Our Vision</h2>
              <p>
                We envision a world where consumers never have to worry about wasting money on subpar products. 
                Our platform aims to be the go-to resource for product research, where every item is thoroughly 
                evaluated by real users.
              </p>
              <p>
                In the future, we plan to expand our categories, introduce video reviews, and develop more advanced 
                filtering tools to help users find exactly what they're looking for.
              </p>
              
              <div className="creator-section">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&h=150" 
                  alt="Creator" 
                  className="creator-image" 
                />
                <h3 className="creator-name">John Developer</h3>
                <p className="creator-role">Founder & Lead Developer</p>
                <p>
                  A passionate web developer with a focus on creating user-friendly and accessible applications. 
                  ShopScore was created as part of a capstone project for the Web Applications Programming course.
                </p>
                
                <div className="social-links">
                  <a href="https://github.com/" className="social-link" target="_blank" rel="noopener noreferrer">GH</a>
                  <a href="https://linkedin.com/" className="social-link" target="_blank" rel="noopener noreferrer">IN</a>
                  <a href="https://twitter.com/" className="social-link" target="_blank" rel="noopener noreferrer">TW</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
