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
    <div className="group relative flex flex-col gap-3 cursor-pointer" onClick={() => onClick(product)}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-50">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
            e.target.onerror = null;
          }}
        />

        {/* Add to Cart Overlay - Visible on Hover */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <Button
            className="w-full bg-black/90 text-white hover:bg-black shadow-xl backdrop-blur-sm font-medium rounded-lg h-11"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1.5 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-base font-medium text-zinc-900 line-clamp-1 group-hover:text-zinc-600 transition-colors">
            {title}
          </h3>
          <p className="text-base font-semibold text-zinc-900 whitespace-nowrap">
            {getFormattedINRPrice(price)}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-black text-black" />
            <span className="text-sm font-medium text-zinc-900">{combined.rate}</span>
          </div>
          <span className="text-sm text-zinc-400">({combined.count} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
