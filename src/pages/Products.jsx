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

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
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
      if (sortOrder === 'asc') {
        return aRate - bRate;
      }
      return bRate - aRate;
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
          {/* Minimal Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-100 pb-8">
            <div className="space-y-2 max-w-lg">
              <h1 className="text-4xl font-light tracking-tight text-zinc-900">Collection</h1>
              <p className="text-zinc-500 font-light text-lg">
                Curated essentials for the modern lifestyle.
              </p>
            </div>

            {/* Clean Search & Filter Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-800 transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent border-b border-zinc-200 py-2 pl-6 text-sm outline-none focus:border-zinc-800 transition-colors placeholder:text-zinc-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingFilter(star)}
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs transition-all ${star <= ratingFilter
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'
                        }`}
                    >
                      {star}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleSort}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors ml-4"
                >
                  <ArrowUpDown className="h-3 w-3" />
                  {sortOrder === 'desc' ? 'Sort' : 'Sort'}
                </button>
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
