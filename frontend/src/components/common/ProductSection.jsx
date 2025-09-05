import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Shuffle, Expand } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../../redux/orebiSlice";

const ProductSection = ({ title, subtitle, products, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.orebiReducer);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerSlide = 4;
  const totalSlides = products.length > itemsPerSlide ? Math.ceil(products.length / itemsPerSlide) : 1;

  // Navigate to product detail page
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        _id: product.id,
        name: product.name,
        quantity: 1,
        image: product.image,
        price: product.price,
        color: "Mixed", // default color
      })
    );
  };

  // Add or remove product from wishlist
  const handleToggleWishlist = (product) => {
    dispatch(
      toggleWishlist({
        _id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      })
    );
  };

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % totalSlides);
          setIsTransitioning(false);
        }, 4000);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  const nextSlide = () => {
    if (isTransitioning || totalSlides <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning || totalSlides <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsTransitioning(false);
    }, 300);
  };

  const getTransformValue = () => `translateX(-${currentSlide * 100}%)`;

  return (
    <div className={`mb-16 mx-auto max-w-7xl ${className || ""}`}>
      <div className="mb-8 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600 text-sm lg:text-base">{subtitle}</p>}
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: getTransformValue() }}>
            {products.map((product, index) => {
              const isWishlisted = wishlist.some(p => p._id === product.id);
              return (
                <div key={product.id || index} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => handleProductClick(product)}>
                      <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
                      {product.discount && <div className="absolute top-3 left-3 bg-primeColor text-white px-2 py-1 rounded-md text-sm font-semibold">-{product.discount}%</div>}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}>
                          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Shuffle className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Expand className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 cursor-pointer" onClick={() => handleProductClick(product)}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>
                      {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-starYellow text-starYellow" : "text-gray-300"}`} />)}
                          <span className="text-sm text-gray-600 ml-1">({product.reviews || 0})</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">Rs. {product.price}</span>
                        {product.originalPrice && <span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice}</span>}
                      </div>
                      <button className="w-full border border-primeColor text-primeColor py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 hover:bg-primeColor hover:text-white" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {totalSlides > 1 && (
          <>
            <button onClick={prevSlide} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 hover:scale-110" disabled={isTransitioning}>
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button onClick={nextSlide} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 hover:scale-110" disabled={isTransitioning}>
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </>
        )}
      </div>
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? "bg-primeColor scale-125" : "bg-gray-300"}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;