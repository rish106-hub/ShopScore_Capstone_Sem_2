import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { fetchAllProducts } from '../api/productApi';
import StarRating from '../components/StarRating';
import '../styles/filterStyles.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = product.rating.rate >= ratingFilter;
      return matchesSearch && matchesRating;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.rating.rate - b.rating.rate;
      }
      return b.rating.rate - a.rating.rate;
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
  
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (ratingFilter) {
      const exactRating = parseInt(ratingFilter);
      result = result.filter(product => {
        const roundedRating = Math.round(product.rating.rate);
        return roundedRating === exactRating;
      });
    }
    
    setFilteredProducts(result);
  }, [searchTerm, ratingFilter, products]);
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="filter-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="rating-filter">
            <label>Rating:</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`rating-star ${star <= ratingFilter ? 'fas fa-star active' : 'far fa-star'}`}
                  onClick={() => handleRatingFilter(star)}
                />
              ))}
            </div>
          </div>
          <button
            className="sort-button"
            onClick={handleSort}
          >
            Sort by Rating
            <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'} sort-icon`} />
          </button>
        </div>
        <div className="products-grid">
          {isLoading ? (
            <div className="loading-message">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No products found matching your criteria.</p>
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
      </main>
      <Footer />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Products;
