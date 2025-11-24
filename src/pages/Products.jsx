import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { fetchAllProducts } from '../api/productApi';
import { getCombinedRating } from '../api/productApi';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating === ratingFilter ? 0 : rating);
  };

  const handleSort = (type) => {
    if (type === 'price') {
      setSortOrder(prev => prev === 'price_asc' ? 'price_desc' : 'price_asc');
    } else if (type === 'rating') {
      setSortOrder(prev => prev === 'rating_asc' ? 'rating_desc' : 'rating_asc');
    }
  };

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter === 0 || Math.round(getCombinedRating(product).rate) >= ratingFilter;
      return matchesSearch && matchesRating;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aRate = getCombinedRating(a).rate;
      const bRate = getCombinedRating(b).rate;
      if (sortOrder === 'price_asc') {
        return a.price - b.price;
      } else if (sortOrder === 'price_desc') {
        return b.price - a.price;
      } else if (sortOrder === 'rating_asc') {
        return aRate - bRate;
      } else if (sortOrder === 'rating_desc') {
        return bRate - aRate;
      }
      return 0;
    });

    setFilteredProducts(sorted);
  }, [products, searchTerm, ratingFilter, sortOrder]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
      setFilteredProducts(data);
      setIsLoading(false);
    };

    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-100">
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col gap-12">
          {/* Sticky Header Section */}
          <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-100 py-6 -mx-4 px-4 md:-mx-8 md:px-8 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-1 max-w-lg">
                <h1 className="text-3xl font-light tracking-tight text-zinc-900">Collection</h1>
                <p className="text-zinc-500 font-light text-sm">
                  {filteredProducts.length} products available
                </p>
              </div>

              {/* Clean Search & Filter Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-64 group">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-800 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent border-b border-zinc-200 py-2 pl-6 text-sm outline-none focus:border-zinc-800 transition-colors placeholder:text-zinc-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-zinc-50 p-1 rounded-full">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingFilter(star)}
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all ${star <= ratingFilter
                          ? 'bg-black text-white shadow-sm'
                          : 'text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600'
                          }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 border-l border-zinc-200 pl-4">
                    <button
                      onClick={() => handleSort('price')}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-full ${sortOrder.includes('price') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                    >
                      Price
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleSort('rating')}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-full ${sortOrder.includes('rating') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                    >
                      Rating
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-zinc-100" />
                  <div className="space-y-2">
                    <div className="h-4 w-2/3 bg-zinc-100" />
                    <div className="h-4 w-1/3 bg-zinc-100" />
                  </div>
                </div>
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-32">
                <p className="text-zinc-400 text-lg font-light">No products found.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setRatingFilter(0);
                  }}
                  className="mt-4 text-sm underline underline-offset-4 text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
