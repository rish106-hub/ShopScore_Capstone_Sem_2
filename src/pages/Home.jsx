
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { fetchAllProducts, getCombinedRating } from '../api/productApi';
import { Button } from "../components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTopProducts = async () => {
      setIsLoading(true);
      const products = await fetchAllProducts();
      const sorted = [...products]
        .sort((a, b) => getCombinedRating(b).rate - getCombinedRating(a).rate)
        .slice(0, 8);
      setTopProducts(sorted);
      setIsLoading(false);
    };

    getTopProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-100">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-6">
              Discover the <span className="font-medium">Exceptional</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Curated reviews and ratings for products that matter. Make informed decisions with confidence.
            </p>
            <Link to="/products">
              <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium bg-zinc-900 hover:bg-zinc-800 text-white transition-all hover:scale-105">
                Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Abstract Background Element */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-zinc-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-zinc-50 rounded-full blur-3xl opacity-50" />
          </div>
        </section>

        {/* Top Products Section */}
        <section className="py-20 border-t border-zinc-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-zinc-900 mb-2">Top Rated</h2>
                <p className="text-zinc-500 font-light">Essentials loved by our community.</p>
              </div>
              <Link to="/products" className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4 animate-pulse">
                    <div className="aspect-[3/4] bg-zinc-100" />
                    <div className="space-y-2">
                      <div className="h-4 w-2/3 bg-zinc-100" />
                      <div className="h-4 w-1/3 bg-zinc-100" />
                    </div>
                  </div>
                ))
              ) : (
                topProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => { }}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-zinc-50/50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 text-center mb-16">Community Voices</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Debasish Karan",
                  date: "April 12, 2025",
                  text: "ShopScore helped me find the perfect laptop. The reviews were detailed and accurate!"
                },
                {
                  name: "Atanu Adhikari",
                  date: "January 28, 2025",
                  text: "I love how easy it is to browse products and check ratings. This site is a game-changer!"
                },
                {
                  name: "Aatmaram Bhide",
                  date: "February 15, 2025",
                  text: "The community here is fantastic. Honest reviews have saved me from making bad purchases."
                }
              ].map((review, i) => (
                <div key={i} className="bg-white p-8 rounded-none border border-zinc-100 hover:border-zinc-200 transition-colors">
                  <div className="flex gap-1 text-zinc-900 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-600 mb-6 font-light leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center justify-between border-t border-zinc-50 pt-4">
                    <span className="font-medium text-sm text-zinc-900">{review.name}</span>
                    <span className="text-xs text-zinc-400">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
