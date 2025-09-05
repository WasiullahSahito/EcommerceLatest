import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../../components/home/Products/ProductDetail';
import { productsData } from '../../constants/productsData'; // YE LINE ADD KAREIN

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product by ID from your existing products data
    const foundProduct = productsData.find(p => p.id.toString() === id);
    
    if (foundProduct) {
      // Transform your data to match ProductDetail component structure
      const transformedProduct = {
        id: foundProduct.id,
        name: foundProduct.name,
        brand: foundProduct.brand,
        price: foundProduct.price,
        originalPrice: foundProduct.originalPrice,
        discount: foundProduct.discount,
        rating: foundProduct.rating,
        reviews: foundProduct.reviewCount,
        inStock: foundProduct.inStock,
        category: foundProduct.category,
        // Create multiple images array (using same image for demo)
        images: [
          foundProduct.image,
          foundProduct.image,
          foundProduct.image,
          foundProduct.image
        ],
        description: foundProduct.description,
        features: [
          `${foundProduct.brand} original product`,
          "Premium quality materials",
          "Fast delivery available",
          foundProduct.verified ? "Verified seller" : "Quality assured",
          foundProduct.badge ? `${foundProduct.badge} item` : "Popular choice",
          "Customer satisfaction guaranteed"
        ],
        specifications: {
          "Brand": foundProduct.brand,
          "Category": foundProduct.category,
          "Rating": `${foundProduct.rating}/5`,
          "Reviews": foundProduct.reviewCount.toString(),
          "Discount": foundProduct.discount ? `${foundProduct.discount}%` : "No discount",
          "Fast Delivery": foundProduct.fastDelivery ? "Available" : "Standard",
          "Verified": foundProduct.verified ? "Yes" : "No",
          "Badge": foundProduct.badge || "Standard",
          "Stock Status": foundProduct.inStock ? "In Stock" : "Out of Stock"
        }
      };
      
      setProduct(transformedProduct);
    } else {
      // Product not found, redirect to products page
      navigate('/products');
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">404</div>
          <div className="text-xl text-gray-600 mb-4">Product not found</div>
          <button 
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;