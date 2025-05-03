
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
                ShopScore was created in 2025 as a capstone project for the Web Applications Programming course. 
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
                  src="data:image/jpeg;base64,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" 
                  alt="Creator" 
                  className="creator-image" 
                />
                <h3 className="creator-name">RISHAV DEWAN</h3>
                <p className="creator-role">Student</p>
                <p>
                  A passionate web developer with a focus on creating user-friendly and accessible applications. 
                  ShopScore was created as part of a capstone project for the Web Applications Programming course.
                </p>
                
                <div className="social-links">
                  <a href="https://github.com/rish106-hub" className="social-link" target="_blank" rel="noopener noreferrer">GH</a>
                  <a href="https://www.linkedin.com/in/rishav-dewan/" className="social-link" target="_blank" rel="noopener noreferrer">IN</a>
                  <a href="https://www.instagram.com/rishav_dewan/" className="social-link" target="_blank" rel="noopener noreferrer">IG</a>
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
