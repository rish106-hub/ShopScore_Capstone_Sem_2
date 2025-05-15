
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchAllProducts, submitReview } from '../api/productApi';
import '../styles/rating.css';

const SubmitReview = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    productId: '',
    rating: 0,
    name: '',
    email: '',
    reviewText: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
      setIsLoading(false);
    };
    
    getProducts();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
    
    // Clear error
    if (formErrors.rating) {
      setFormErrors({
        ...formErrors,
        rating: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.productId) {
      errors.productId = 'Please select a product';
    }
    
    if (formData.rating === 0) {
      errors.rating = 'Please select a rating';
    }
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.reviewText.trim()) {
      errors.reviewText = 'Review text is required';
    } else if (formData.reviewText.length < 10) {
      errors.reviewText = 'Review text must be at least 10 characters';
    }
    
    return errors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      const response = await submitReview(formData);
      
      if (response.success) {
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          productId: '',
          rating: 0,
          name: '',
          email: '',
          reviewText: ''
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setFormErrors({
        ...formErrors,
        submit: 'Failed to submit review. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Navbar />
      
      <main>
        <section className="products-section">
          <div className="container">
            <h1 className="section-title">Submit Your Review</h1>
            
            <div className="review-form">
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <h3 style={{ color: 'var(--success-color)', marginBottom: '15px' }}>Thank you for your review!</h3>
                  <p>Your feedback has been submitted successfully.</p>
                  <p>Redirecting to products page...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="productId" className="form-label">Select Product</label>
                    <select
                      id="productId"
                      name="productId"
                      className="form-select"
                      value={formData.productId}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    >
                      <option value="">-- Select a product --</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.title}
                        </option>
                      ))}
                    </select>
                    {formErrors.productId && <div style={{ color: 'var(--error-color)', fontSize: '14px', marginTop: '5px' }}>{formErrors.productId}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <select
                      id="rating"
                      name="rating"
                      className="form-select"
                      value={formData.rating}
                      onChange={(e) => handleRatingChange(Number(e.target.value))}
                    >
                      <option value="0">-- Select a rating --</option>
                      {[5, 4, 3, 2, 1].map(rating => (
                        <option key={rating} value={rating}>
                          {rating} star{rating !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    {formErrors.rating && <div style={{ color: 'var(--error-color)', fontSize: '14px', marginTop: '5px' }}>{formErrors.rating}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && <div style={{ color: 'var(--error-color)', fontSize: '14px', marginTop: '5px' }}>{formErrors.name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <div style={{ color: 'var(--error-color)', fontSize: '14px', marginTop: '5px' }}>{formErrors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="reviewText" className="form-label">Your Review</label>
                    <textarea
                      id="reviewText"
                      name="reviewText"
                      className="form-textarea"
                      value={formData.reviewText}
                      onChange={handleInputChange}
                      placeholder="Share your experience with this product..."
                    ></textarea>
                    {formErrors.reviewText && <div style={{ color: 'var(--error-color)', fontSize: '14px', marginTop: '5px' }}>{formErrors.reviewText}</div>}
                  </div>
                  
                  {formErrors.submit && <div style={{ color: 'var(--error-color)', fontSize: '14px', marginBottom: '15px' }}>{formErrors.submit}</div>}
                  
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SubmitReview;
