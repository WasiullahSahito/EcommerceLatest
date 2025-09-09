import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Shuffle, Expand } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { addToCart, toggleWishlist } from "../../redux/orebiSlice";

const ProductSection = ({ title, subtitle, products, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, wishlist } = useSelector((state) => state.orebiReducer);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerSlide = 4;
  const totalSlides = products.length > itemsPerSlide ? Math.ceil(products.length / itemsPerSlide) : 1;

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product) => {
    if (!userInfo) {
      toast.error("Please login first to add to cart.");
      return;
    }
    dispatch(
      addToCart({
        _id: product.id,
        name: product.name,
        quantity: 1,
        image: product.image,
        price: product.price,
        color: "Mixed",
      })
    );
    toast.success(`${product.name} added to cart!`);

    axios.post("http://localhost:5000/api/user/cart",
      { productId: product.id, quantity: 1 },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    ).catch(err => console.error("Cart sync failed:", err));
  };

  const handleToggleWishlist = (product) => {
    if (!userInfo) {
      toast.error("Please login first to add to wishlist.");
      return;
    }
    const isCurrentlyWishlisted = wishlist.some((p) => p._id === product.id);
    dispatch(
      toggleWishlist({
        _id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      })
    );
    toast.success(isCurrentlyWishlisted ? "Removed from wishlist" : "Added to wishlist");

    axios.post("http://localhost:5000/api/user/wishlist",
      { productId: product.id },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    ).catch(err => console.error("Wishlist sync failed:", err));
  };

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className={`w-4 h-4 fill-starYellow text-starYellow`} />);
    }
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`w-4 h-4 text-gray-300`} />);
    }
    return stars;
  };

  return (
    <div className={`mb-16 mx-auto max-w-7xl px-4 ${className || ""}`}>
      <div className="mb-8 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600 text-sm lg:text-base">{subtitle}</p>}
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: getTransformValue() }}>
            {products.map((product) => {
              const isWishlisted = wishlist.some((p) => p._id === product.id);
              return (
                <div key={product.id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => handleProductClick(product)}>
                      <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
                      {product.discount && (
                        <div className="absolute top-3 left-3 bg-primeColor text-white px-2 py-1 rounded-md text-sm font-semibold">
                          -{product.discount}%
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                          onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? "text-red-500 fill-current" : "text-gray-600"}`} />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Shuffle className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Expand className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 cursor-pointer flex flex-col flex-grow" onClick={() => handleProductClick(product)}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-600 ml-1">({product.reviewCount || 0})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">Rs. {product.price}</span>
                        {product.originalPrice && <span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice}</span>}
                      </div>
                      <button
                        className="w-full border border-primeColor text-primeColor py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-primeColor hover:text-white duration-300 mt-auto"
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      >
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
            <button
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 hover:scale-110 hidden md:block"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 hover:scale-110 hidden md:block"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </>
        )}
      </div>
      {totalSlides > 1 && (
        <div className="flex justify-center -mt-8 mb-12 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? "bg-primeColor scale-125" : "bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;