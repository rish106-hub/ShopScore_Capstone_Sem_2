
import React from 'react';

const StarRating = ({ rating, count }) => {
  // Generate an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 1;
    
    // Full star
    if (number <= Math.floor(rating)) {
      return <i key={index} className="star fas fa-star"></i>;
    }
    
    // Half star
    if (number - 0.5 <= rating) {
      return <i key={index} className="star fas fa-star-half-alt"></i>;
    }
    
    // Empty star
    return <i key={index} className="star far fa-star"></i>;
  });

  return (
    <div className="product-rating">
      <div className="stars">{stars}</div>
      {count && <span className="rating-count">({count})</span>}
    </div>
  );
};

export default StarRating;
