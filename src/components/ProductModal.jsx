import React from 'react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { getFormattedINRPrice } from '../utils/currency';

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const { title, price, description, image, rating } = product;

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
              <StarRating rating={rating.rate} count={rating.count} />
              <p className="product-detail-price">{getFormattedINRPrice(price)}</p>
              <p className="product-detail-description">{description}</p>
              
              <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
          
          <div className="product-reviews">
            <h3 className="reviews-title">Customer Reviews</h3>
            {/* This would be populated with actual reviews from an API */}
            <div className="review-item">
              <div className="review-header">
                <span className="reviewer-name">John Doe</span>
                <span className="review-date">January 15, 2023</span>
              </div>
              <StarRating rating={4.5} />
              <p className="review-text">This product exceeded my expectations. The quality is amazing and it works perfectly!</p>
            </div>
            
            <div className="review-item">
              <div className="review-header">
                <span className="reviewer-name">Jane Smith</span>
                <span className="review-date">December 3, 2022</span>
              </div>
              <StarRating rating={5} />
              <p className="review-text">Absolutely love it! Fast shipping and the product is exactly as described.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
