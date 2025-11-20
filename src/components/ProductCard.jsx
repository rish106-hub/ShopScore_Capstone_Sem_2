import React from 'react';
import { getFormattedINRPrice } from '../utils/currency';
import { useCart } from '../contexts/CartContext';
import { getCombinedRating } from '../api/productApi';
import { Button } from '../components/ui/button';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  const { id, title, price, image, rating } = product;
  const { addToCart } = useCart();
  const combined = getCombinedRating(product);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col gap-4 cursor-pointer" onClick={() => onClick(product)}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
            e.target.onerror = null;
          }}
        />

        {/* Add to Cart Overlay - Visible on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Button
            className="w-full bg-white text-black hover:bg-zinc-100 shadow-lg font-medium"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-sm font-medium text-zinc-900 line-clamp-1 group-hover:underline underline-offset-4 decoration-zinc-300">
            {title}
          </h3>
          <p className="text-sm font-semibold text-zinc-900 whitespace-nowrap">
            {getFormattedINRPrice(price)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-zinc-900 text-zinc-900" />
          <span className="text-xs text-zinc-500 font-medium">{combined.rate}</span>
          <span className="text-xs text-zinc-300">({combined.count})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
