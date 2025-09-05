import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import { addToCart, toggleWishlist } from '../../../redux/orebiSlice';

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.orebiReducer);

  // Sample product data - replace with actual product prop
  const sampleProduct = {
    id: 1,
    name: "Premium Leather Laptop Bag",
    brand: "LuxuryBags",
    price: 2500,
    originalPrice: 3000,
    discount: 17,
    rating: 4.5,
    reviews: 120,
    inStock: true,
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      "https://images.unsplash.com/photo-1614179689702-355944cd0918?w=600",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600"
    ],
    description: "This premium leather laptop bag combines style with functionality. Crafted from genuine leather, it features multiple compartments to organize your essentials while maintaining a professional appearance.",
    features: [
      "Genuine leather construction",
      "Fits laptops up to 15.6 inches",
      "Multiple compartments for organization",
      "Adjustable shoulder strap",
      "Water-resistant coating",
      "Premium brass hardware"
    ],
    specifications: {
      "Material": "Genuine Leather",
      "Dimensions": "40cm x 30cm x 12cm",
      "Weight": "1.2kg",
      "Laptop Size": "Up to 15.6 inches",
      "Color Options": "Black, Brown, Tan",
      "Warranty": "2 Years"
    }
  };

  const productData = product || sampleProduct;
  const isWishlisted = wishlist.some(p => p._id === productData.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: productData.id,
        name: productData.name,
        quantity: quantity,
        image: productData.images[0],
        price: productData.price,
        colors: selectedColor,
      })
    );
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist({ ...productData, _id: productData.id, image: productData.images[0] }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
          }`}
      />
    ));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>Home</span>
          <span>/</span>
          <span>{productData.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{productData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg cursor-zoom-in"
                onClick={() => setShowImageModal(true)}
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-blue-600 font-medium">{productData.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                {productData.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center mt-3 space-x-3">
                <div className="flex items-center">
                  {renderStars(productData.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {productData.rating} ({productData.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                Rs. {productData.price.toLocaleString()}
              </span>
              {productData.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  Rs. {productData.originalPrice.toLocaleString()}
                </span>
              )}
              {productData.discount && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                  {productData.discount}% OFF
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {["Black", "Brown", "Tan"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${selectedColor === color
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {productData.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!productData.inStock}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-colors ${productData.inStock
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleToggleWishlist}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg border transition-colors ${isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>Wishlist</span>
                </button>

                <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-600">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <span className="text-sm text-gray-600">2 Year Warranty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-6 h-6 text-orange-600" />
                  <span className="text-sm text-gray-600">30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'features', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {productData.description}
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <ul className="space-y-3">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(productData.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <dt className="font-medium text-gray-900">{key}</dt>
                      <dd className="text-gray-700">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="text-center py-12">
                  <p className="text-gray-500">Reviews section would go here</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Integration with your review system needed
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
              >
                <span className="sr-only">Close</span>
                ×
              </button>

              {/* Modal Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;