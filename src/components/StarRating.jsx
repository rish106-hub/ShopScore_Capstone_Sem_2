
import React from 'react';

const StarRating = ({ rating, count }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 1;
    if (number <= Math.floor(rating)) {
      return <i key={index} className="star fas fa-star"></i>;
    }
    
    const hasHalfStar = rating % 1 !== 0;
    if (hasHalfStar && number - 0.5 <= rating) {
      return <i key={index} className="star fas fa-star-half-alt"></i>;
    }
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
