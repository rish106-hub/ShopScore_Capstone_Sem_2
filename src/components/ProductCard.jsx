import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { getFormattedINRPrice } from '../utils/currency';
import { useCart } from '../contexts/CartContext';
import { getCombinedRating } from '../api/productApi';
import { Button } from '../components/ui/button';

const ProductCard = ({ product, onClick }) => {
  const { id, title, price, image, rating } = product;
  const { addToCart } = useCart();
  const combined = getCombinedRating(product);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card relative overflow-hidden rounded-xl border border-border bg-white/70 dark:bg-black/30 backdrop-blur shadow-sm hover:shadow-md transition-shadow">
      <div onClick={() => onClick(product)} className="cursor-pointer">
        <div className="product-image-container aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="product-image h-full w-full object-contain p-4 transition-transform duration-300 hover:scale-[1.03]"
            width="300"
            height="300"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
              e.target.onerror = null;
            }}
          />
        </div>
        <div className="product-content space-y-1 px-4 pb-14 pt-2">
          <h3 className="product-title line-clamp-2 text-sm font-medium text-foreground/90">
            {title.length > 60 ? `${title.substring(0, 60)}...` : title}
          </h3>
          <p className="product-price text-base font-semibold text-foreground">
            {getFormattedINRPrice(price)}
          </p>
          <div className="mt-1">
            <StarRating rating={combined.rate} count={combined.count} />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <Button className="add-to-cart-btn w-full" onClick={handleAddToCart} size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
