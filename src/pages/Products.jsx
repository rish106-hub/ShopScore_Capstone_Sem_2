import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { fetchAllProducts } from '../api/productApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
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
      
      <main>
        <section className="products-section">
          <div className="container">
            <h1 className="section-title">All Products</h1>
            
            <div className="search-filter">
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select 
                className="filter-select"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="">Filter by Rating</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              <button 
                className="btn"
                onClick={() => {
                  setSearchTerm('');
                  setRatingFilter('');
                }}
              >
                Reset Filters
              </button>
            </div>
            
            {isLoading ? (
              <p style={{ textAlign: 'center' }}>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center' }}>No products found matching your criteria.</p>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={handleProductClick} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
      
      <Footer />
    </>
  );
};

export default Products;
