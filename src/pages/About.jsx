
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
            <div className="about-hero">
              <h1 className="section-title">About ShopScore</h1>
              <p className="about-lead">
                A platform built to help you make confident purchase decisions with transparent reviews and real user ratings.
              </p>
            </div>

            <div className="about-grid">
              <article className="about-card">
                <h2><b>Our History</b></h2>
                <p>
                  ShopScore was created in 2025 as a capstone project for the Web Applications Programming course.
                </p>
                <p>
                  The goal was to create a platform where users could find honest reviews and ratings for products they're interested in purchasing.
                </p>
                <p>
                  What started as a simple academic project has evolved into a comprehensive resource for consumers 
                  looking to make informed purchase decisions based on real user experiences.
                </p>
              </article>

              <article className="about-card">
                <h2><b>Our Mission</b></h2>
                <p>
                  At ShopScore, our mission is to empower consumers with transparent, honest, and detailed product 
                  reviews. We believe that every shopper deserves access to reliable information before making a purchase.
                </p>
                <p>
                  By fostering a community of honest reviewers, we aim to create a trustworthy ecosystem where both 
                  consumers and quality products can thrive.
                </p>
              </article>

              <article className="about-card">
                <h2><b>Our Vision</b></h2>
                <p>
                  We envision a world where consumers never have to worry about wasting money on subpar products. 
                  Our platform aims to be the go-to resource for product research, where every item is thoroughly 
                  evaluated by real users.
                </p>
                <p>
                  In the future, we plan to expand our categories, introduce video reviews, and develop more advanced 
                  filtering tools to help users find exactly what they're looking for.
                </p>
              </article>
            </div>

            <div className="creator-section creator-flex">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHT-FcOKP7HGQ/profile-displayphoto-scale_200_200/B4DZhRY.leHAAY-/0/1753712159860?e=2147483647&v=beta&t=mGboLq0FdyytSU4RZ6tNsDvyPYSOawagpdYiBtJzfQI"
                alt="Creator"
                className="creator-image"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://i.pravatar.cc/400?img=12';
                }}
              />
              <div className="creator-content">
                <h3 className="creator-name">RISHAV DEWAN</h3>
                <p className="creator-role">Student</p>
                <p>
                  A passionate web developer with a focus on creating user-friendly and accessible applications. 
                  ShopScore was created as part of a capstone project for the Web Applications Programming course.
                </p>
                <div className="social-links">
                  <a href="https://github.com/rish106-hub" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/rishav-dewan/" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.instagram.com/rishav_dewan/" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
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
