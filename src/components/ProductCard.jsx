import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { getFormattedINRPrice } from '../utils/currency';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, onClick }) => {
  const { id, title, price, image, rating } = product;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div onClick={() => onClick(product)}>
        <div className="product-image-container">
          <img 
            src={image} 
            alt={title} 
            className="product-image" 
            width="300"
            height="300"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
              e.target.onerror = null;
            }}
          />
        </div>
        <div className="product-content">
          <h3 className="product-title">{title.length > 50 ? `${title.substring(0, 50)}...` : title}</h3>
          <p className="product-price">{getFormattedINRPrice(price)}</p>
          <StarRating rating={rating.rate} count={rating.count} />
        </div>
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
