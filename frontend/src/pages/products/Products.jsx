import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid,
  Button,
  Fab,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  GridView as GridIcon,
  ViewList as ListIcon,
  Star,
  ShoppingCart,
  Favorite,
  CompareArrows,
  ZoomOutMap,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../../components/home/Products/productfilter/ProductFilter";
import { productsData, categoriesData } from "../../constants/productsData.js";
import { addToCart, toggleWishlist } from "../../redux/orebiSlice";

// Styled toggle button group for view mode
const StyledToggleButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.grey[100],
  borderRadius: "8px",
  overflow: "hidden",
  marginLeft: theme.spacing(2),
}));

const StyledToggleButton = styled("button")(({ theme, selected }) => ({
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  backgroundColor: selected ? theme.palette.primary.main : "transparent",
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.grey[200],
  },
}));

// Modern Product Card matching your design
const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }

    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 h-full flex flex-col">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => onToggleWishlist(product)} className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-110">
            <Favorite className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-110">
            <CompareArrows className="w-5 h-5 text-gray-600 hover:text-blue-500" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-110">
            <ZoomOutMap className="w-5 h-5 text-gray-600 hover:text-green-500" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            Rs. {product.price?.toLocaleString() || '0'}
          </span>
          {product.originalPrice > 0 && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button onClick={() => onAddToCart(product)} className="w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 mt-auto">
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.orebiReducer);

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 60000 },
    ratings: [],
  });
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const catNameParam = searchParams.get("catId")?.toLowerCase();
    if (catNameParam) {
      const category = categoriesData.find(
        (c) => c.name.toLowerCase() === catNameParam
      );
      if (category) {
        setFilters((prev) => ({ ...prev, categories: [category.id] }));
      }
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = productsData;
    const queryParam = searchParams.get("q")?.toLowerCase();

    // Search filter from URL
    if (queryParam) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(queryParam) ||
          product.description.toLowerCase().includes(queryParam) ||
          product.brand.toLowerCase().includes(queryParam)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.categoryId)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // Rating filter
    if (filters.ratings.length > 0) {
      filtered = filtered.filter((product) =>
        filters.ratings.some((r) => product.rating >= r)
      );
    }

    return filtered;
  }, [filters, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, _id: product.id, quantity: 1 }));
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist({ ...product, _id: product.id }));
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((p) => p._id === productId);
  };

  const toggleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: "flex", gap: 3, position: "relative" }}>
          {/* Sidebar Filters (for  Desktop) */}
          {!isMobile && (
            <Box
              sx={{
                width: 280,
                flexShrink: 0,
                position: "sticky",
                top: 150,
                alignSelf: "flex-start",
                bgcolor: "white",
                boxShadow: 1,
                p: 0,
                borderRadius: 2,
              }}
            >
              <ProductFilter onFilterChange={handleFilterChange} />
            </Box>
          )}

          {/* Drawer Filters ( for Mobiles) */}
          <Drawer
            anchor="left"
            open={isFilterOpen}
            onClose={toggleFilterDrawer}
            sx={{
              display: { lg: "none" },
              "& .MuiDrawer-paper": {
                width: 320,
                maxWidth: "90vw",
                bgcolor: "white",
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: "grey.200",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Filters
              </Typography>
              <IconButton onClick={toggleFilterDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ p: 2, overflow: "auto" }}>
              <ProductFilter onFilterChange={handleFilterChange} />
            </Box>
          </Drawer>

          {/* Products Section */}
          <Box sx={{ flex: 1 }}>
            {/* Top Controls */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 1,
                position: "sticky",
                top: 150,
                zIndex: 10,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {filteredProducts.length} products found
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StyledToggleButtonGroup>
                  <StyledToggleButton
                    selected={viewMode === "grid"}
                    onClick={() => setViewMode("grid")}
                  >
                    <GridIcon />
                  </StyledToggleButton>
                  <StyledToggleButton
                    selected={viewMode === "list"}
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon />
                  </StyledToggleButton>
                </StyledToggleButtonGroup>

                {isMobile && (
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    onClick={toggleFilterDrawer}
                    sx={{ borderRadius: "20px", ml: 2 }}
                  >
                    Filters
                  </Button>
                )}
              </Box>
            </Box>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={isProductInWishlist(product.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box>
                {filteredProducts.map((product) => (
                  <Box key={product.id} sx={{ mb: 2 }}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={isProductInWishlist(product.id)}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* No Products Message */}
            {filteredProducts.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: 1,
                  mt: 3,
                }}
              >
                <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your filters
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Floating FAB for Filters */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
          onClick={toggleFilterDrawer}
        >
          <FilterIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Products;