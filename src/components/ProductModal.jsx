import React from 'react';
import StarRating from './StarRating';
import { useCart } from '../contexts/CartContext';
import { getFormattedINRPrice } from '../utils/currency';
import { getCombinedRating, getUserReviews } from '../api/productApi';

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const { title, price, description, image } = product;
  const combined = getCombinedRating(product);
  const reviews = getUserReviews(product.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-content">
          <div className="product-detail">
            <div className="product-detail-image">
              <img src={image} alt={title} />
            </div>
            
            <div className="product-detail-content">
              <h2 className="product-detail-title">{title}</h2>
              <StarRating rating={combined.rate} count={combined.count} />
              <p className="product-detail-price">{getFormattedINRPrice(price)}</p>
              <p className="product-detail-description">{description}</p>
              
              <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
          
          <div className="product-reviews">
            <h3 className="reviews-title">Customer Reviews</h3>
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.name}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="review-text">{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
