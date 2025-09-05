import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Shuffle, Expand } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../../../redux/orebiSlice";
// Import the central product data
import { productsData } from "../../../constants/productsData";

const NewArrivals = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.orebiReducer);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter products from the main data source for the "New Arrivals" section
  const products = productsData
    .filter(p => p.badge === "New" || p.badge === "Hot Deal" || p.badge === "Trending")
    .slice(0, 8); // Display up to 8 "New Arrival" items

  const itemsPerView = 4;
  const totalSlides = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (totalSlides + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (totalSlides + 1)) % (totalSlides + 1));
  };

  const handleProductNavigation = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      _id: product.id,
      name: product.name,
      quantity: 1,
      image: product.image,
      badge: product.badge,
      price: product.price,
      color: "Mixed",
    }));
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist({
      _id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-starYellow fill-current" />);
    }
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <section className="bg-white py-3 lg:py-8 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
            New Arrivals
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-normal mt-2 text-gray-600">
            Do not miss the current offers until the end of March.
          </p>
        </div>
        <div className="w-full">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
              >
                {products.map((product) => {
                  const isWishlisted = wishlist.some(p => p._id === product.id);
                  return (
                    <div key={product.id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2">
                      <div className="productItem shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 bg-white">
                        <div className="group imgWrapper w-full overflow-hidden rounded-t-lg relative">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleProductNavigation(product.id)}
                          >
                            <div className="img h-64 overflow-hidden relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </div>
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-primeColor text-white px-2 py-1 rounded-md text-sm font-semibold">
                              -{product.discount}%
                            </span>
                          </div>
                          <div className="actions absolute top-3 right-3 z-10 flex items-center gap-2 flex-col opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }} className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center transition-colors shadow-md hover:scale-110">
                              <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center transition-colors shadow-md hover:scale-110" onClick={(e) => e.stopPropagation()}>
                              <Shuffle className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center transition-colors shadow-md hover:scale-110" onClick={(e) => e.stopPropagation()}>
                              <Expand className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="info p-4 relative bg-white cursor-pointer" onClick={() => handleProductNavigation(product.id)}>
                          <h6 className="text-sm text-gray-500 mb-1">{product.brand}</h6>
                          <h3 className="text-base font-semibold mb-2 text-gray-900 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">{renderStars(product.rating)}</div>
                            <span className="ml-2 text-sm text-gray-500">({product.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold text-primeColor">Rs. {product.price}</span>
                            {product.originalPrice && <span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice}</span>}
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="w-full border border-primeColor text-primeColor py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-primeColor hover:text-white">
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {products.length > itemsPerView && (
              <>
                <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 border border-gray-200">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 border border-gray-200">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides + 1 }).map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-primeColor scale-125" : "bg-gray-300 hover:bg-gray-400"}`} />
          ))}
        </div>

        {/* ========================================= */}
        {/* View All Products Button - START          */}
        {/* ========================================= */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-primeColor text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            View All Products
          </Link>
        </div>
        {/* ========================================= */}
        {/* View All Products Button - END            */}
        {/* ========================================= */}

      </div>
    </section>
  );
};

export default NewArrivals;