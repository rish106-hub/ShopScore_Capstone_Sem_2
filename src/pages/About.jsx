
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Github, Linkedin, Instagram } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-zinc-50/50 border-b border-zinc-100">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900 mb-6">About ShopScore</h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed">
              A platform built to help you make confident purchase decisions with transparent reviews and real user ratings.
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-zinc-900">Our History</h2>
                <div className="w-12 h-0.5 bg-zinc-900/10"></div>
                <p className="text-zinc-600 leading-relaxed font-light">
                  ShopScore was created in 2025 as a capstone project for the Web Applications Programming course.
                </p>
                <p className="text-zinc-600 leading-relaxed font-light">
                  What started as a simple academic project has evolved into a comprehensive resource for consumers looking to make informed purchase decisions based on real user experiences.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-medium text-zinc-900">Our Mission</h2>
                <div className="w-12 h-0.5 bg-zinc-900/10"></div>
                <p className="text-zinc-600 leading-relaxed font-light">
                  At ShopScore, our mission is to empower consumers with transparent, honest, and detailed product reviews. We believe that every shopper deserves access to reliable information before making a purchase.
                </p>
                <p className="text-zinc-600 leading-relaxed font-light">
                  By fostering a community of honest reviewers, we aim to create a trustworthy ecosystem.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-medium text-zinc-900">Our Vision</h2>
                <div className="w-12 h-0.5 bg-zinc-900/10"></div>
                <p className="text-zinc-600 leading-relaxed font-light">
                  We envision a world where consumers never have to worry about wasting money on subpar products. Our platform aims to be the go-to resource for product research.
                </p>
                <p className="text-zinc-600 leading-relaxed font-light">
                  In the future, we plan to expand our categories and introduce video reviews.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="py-20 bg-zinc-900 text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
              <div className="shrink-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHT-FcOKP7HGQ/profile-displayphoto-scale_200_200/B4DZhRY.leHAAY-/0/1753712159860?e=2147483647&v=beta&t=mGboLq0FdyytSU4RZ6tNsDvyPYSOawagpdYiBtJzfQI"
                  alt="Rishav Dewan"
                  className="h-48 w-48 rounded-full object-cover border-4 border-white/10 shadow-2xl"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://i.pravatar.cc/400?img=12';
                  }}
                />
              </div>

              <div className="text-center md:text-left space-y-6">
                <div>
                  <h3 className="text-3xl font-light mb-2">Rishav Dewan</h3>
                  <p className="text-zinc-400 uppercase tracking-widest text-sm font-medium">Creator & Developer</p>
                </div>

                <p className="text-zinc-300 leading-relaxed font-light text-lg">
                  A passionate web developer with a focus on creating user-friendly and accessible applications.
                  ShopScore was created as part of a capstone project for the Web Applications Programming course.
                </p>

                <div className="flex items-center justify-center md:justify-start gap-6">
                  <a href="https://github.com/rish106-hub" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/rishav-dewan/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="https://www.instagram.com/rishav_dewan/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
