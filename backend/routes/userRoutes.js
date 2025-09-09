const express = require('express');
const { addToCart, addToWishlist } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

// All routes here are protected
router.post('/cart', protect, addToCart);
router.post('/wishlist', protect, addToWishlist);

module.exports = router;