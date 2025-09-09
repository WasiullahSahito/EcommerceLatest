import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const StarRating = ({ rating, reviewCount }) => (
    <div className="flex items-center gap-1 mb-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            className={`w-3 h-3 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-500">({reviewCount})</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image || '/api/placeholder/300/200'} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group"
        >
          <svg 
            className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        {/* Quick View Button - Shows on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 h-12 line-clamp-2 leading-5">
          {product.name}
        </h3>
        
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-red-500">
            Rs {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              Rs {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button 
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            product.inStock 
              ? 'bg-primeColor hover:bg-primeColor text-white transform hover:scale-[1.02] active:scale-[0.98]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-6"/>
              </svg>
              Add to Cart
            </span>
          ) : (
            'Out of Stock'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;