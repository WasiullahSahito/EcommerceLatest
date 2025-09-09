import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Container, Typography, Drawer, IconButton, useMediaQuery, useTheme, Grid, Button, Fab } from "@mui/material";
import { FilterList as FilterIcon, Close as CloseIcon, GridView as GridIcon, ViewList as ListIcon, Star, ShoppingCart, Favorite } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import ProductFilter from "../../components/home/Products/productfilter/ProductFilter";
import { productsData, categoriesData } from "../../constants/productsData.js";
import { addToCart, toggleWishlist } from "../../redux/orebiSlice";

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
      <div className="relative overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
        </Link>
        {product.discount > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">-{product.discount}%</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => onToggleWishlist(product)} className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center hover:scale-110">
            <Favorite className={`w-5 h-5 transition-colors ${isWishlisted ? "text-red-500" : "text-gray-600 hover:text-primeColor"}`} />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primeColor transition-colors min-h-[3.5rem]">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2 min-h-[1.5rem]">
          {product.rating && (<><div className="flex items-center">{renderStars(product.rating)}</div><span className="text-sm text-gray-600 ml-1">({product.reviewCount || 0})</span></>)}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">Rs. {product.price?.toLocaleString() || "0"}</span>
          {product.originalPrice > 0 && (<span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice.toLocaleString()}</span>)}
        </div>
        <button onClick={() => onAddToCart(product)} className="w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 mt-auto">
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { userInfo, wishlist } = useSelector((state) => state.orebiReducer);
  const [filters, setFilters] = useState({ categories: [], priceRange: { min: 0, max: 60000 }, ratings: [] });
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const catNameParam = searchParams.get("catId")?.toLowerCase();
    if (catNameParam) {
      const category = categoriesData.find((c) => c.name.toLowerCase() === catNameParam);
      if (category) {
        setFilters({ categories: [category.id], priceRange: { min: 0, max: 60000 }, ratings: [] });
      }
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = productsData;
    const queryParam = searchParams.get("q")?.toLowerCase();
    if (queryParam) {
      filtered = filtered.filter((p) => (p.name || '').toLowerCase().includes(queryParam) || (p.description || '').toLowerCase().includes(queryParam) || (p.brand || '').toLowerCase().includes(queryParam));
    }
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.categoryId));
    }
    filtered = filtered.filter((p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    if (filters.ratings.length > 0) {
      filtered = filtered.filter((p) => filters.ratings.some((r) => p.rating >= r));
    }
    return filtered;
  }, [filters, searchParams]);

  const handleFilterChange = (newFilters) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete('catId');
    setSearchParams(currentParams);
    setFilters(newFilters);
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!userInfo) {
      toast.error("Please login to add items to your cart.");
      return;
    }
    dispatch(addToCart({ ...product, _id: product.id, quantity: 1 }));
    toast.success(`${product.name} added to cart!`);
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    axios.post("http://localhost:5000/api/user/cart", { productId: product.id, quantity: 1 }, config).catch(err => toast.error("Could not save to your account."));
  };

  const handleToggleWishlist = (product) => {
    if (!userInfo) {
      toast.error("Please login to manage your wishlist.");
      return;
    }
    const isCurrentlyWishlisted = wishlist.some((p) => p._id === product.id);
    dispatch(toggleWishlist({ ...product, _id: product.id }));
    toast.success(isCurrentlyWishlisted ? "Removed from wishlist" : "Added to wishlist");
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    axios.post("http://localhost:5000/api/user/wishlist", { productId: product.id }, config).catch(err => toast.error("Could not update your wishlist."));
  };

  const isProductInWishlist = (productId) => wishlist.some((p) => p._id === productId);
  const toggleFilterDrawer = () => setIsFilterOpen(!isFilterOpen);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: "flex", gap: 3, position: "relative" }}>
          {!isMobile && (
            <Box sx={{ width: 280, flexShrink: 0, position: "sticky", top: 150, alignSelf: "flex-start", bgcolor: "white", boxShadow: 1, p: 0, borderRadius: 2 }}>
              <ProductFilter onFilterChange={handleFilterChange} initialFilters={filters} />
            </Box>
          )}
          <Drawer anchor="left" open={isFilterOpen} onClose={toggleFilterDrawer} sx={{ display: { lg: "none" }, "& .MuiDrawer-paper": { width: 320, maxWidth: "90vw" } }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "grey.200", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Filters</Typography><IconButton onClick={toggleFilterDrawer}><CloseIcon /></IconButton>
            </Box>
            <Box sx={{ p: 2, overflow: "auto" }}><ProductFilter onFilterChange={handleFilterChange} initialFilters={filters} /></Box>
          </Drawer>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, p: 2, bgcolor: "white", borderRadius: 2, boxShadow: 1, position: "sticky", top: 150, zIndex: 10 }}>
              <Typography variant="body2" color="text.secondary">{filteredProducts.length} products found</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StyledToggleButtonGroup>
                  <StyledToggleButton selected={viewMode === "grid"} onClick={() => setViewMode("grid")}><GridIcon /></StyledToggleButton>
                  <StyledToggleButton selected={viewMode === "list"} onClick={() => setViewMode("list")}><ListIcon /></StyledToggleButton>
                </StyledToggleButtonGroup>
                {isMobile && <Button variant="outlined" startIcon={<FilterIcon />} onClick={toggleFilterDrawer} sx={{ borderRadius: "20px", ml: 2 }}>Filters</Button>}
              </Box>
            </Box>
            {viewMode === "grid" ? (
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (<Grid item key={product.id} xs={12} sm={6} md={4} lg={4}><ProductCard product={product} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} isWishlisted={isProductInWishlist(product.id)} /></Grid>))}
              </Grid>
            ) : (
              <Box>
                {filteredProducts.map((product) => (<Box key={product.id} sx={{ mb: 2 }}><ProductCard product={product} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} isWishlisted={isProductInWishlist(product.id)} /></Box>))}
              </Box>
            )}
            {filteredProducts.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8, bgcolor: "white", borderRadius: 2, boxShadow: 1, mt: 3 }}>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>No products found</Typography><Typography variant="body1" color="text.secondary">Try adjusting your filters</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      {isMobile && <Fab color="primary" sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }} onClick={toggleFilterDrawer}><FilterIcon /></Fab>}
    </Box>
  );
};

export default Products;