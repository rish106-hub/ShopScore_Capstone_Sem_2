import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { fetchAllProducts } from '../api/productApi';
import { getCombinedRating } from '../api/productApi';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, SlidersHorizontal, Star, ArrowUpDown } from "lucide-react";

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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-muted-foreground">
              Browse our collection of premium products.
            </p>
          </div>

          {/* Filters & Search Bar */}
          <div className="sticky top-20 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-b">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-9 bg-secondary/50 border-transparent focus:border-primary transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <div className="flex items-center border rounded-md p-1 bg-secondary/30">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingFilter(star)}
                      className={`p-2 rounded-sm transition-all ${star <= ratingFilter
                          ? 'text-yellow-500 bg-background shadow-sm'
                          : 'text-muted-foreground hover:text-yellow-500/70'
                        }`}
                      title={`Filter by ${star} stars`}
                    >
                      <Star className={`h-4 w-4 ${star <= ratingFilter ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSort}
                  className="ml-auto whitespace-nowrap gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortOrder === 'desc' ? 'Highest Rated' : 'Lowest Rated'}
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Skeleton loading state
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square rounded-xl bg-secondary/50 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-secondary/50 animate-pulse" />
                    <div className="h-4 w-1/2 rounded bg-secondary/50 animate-pulse" />
                  </div>
                </div>
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or filters.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm('');
                    setRatingFilter(0);
                  }}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
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
