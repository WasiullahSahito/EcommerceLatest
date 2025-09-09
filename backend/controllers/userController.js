const User = require('../models/userModel.js');

// @desc    Add item to cart
// @route   POST /api/user/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        const itemExists = user.cart.find(
            (item) => item.product.toString() === productId
        );

        if (itemExists) {
            itemExists.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        res.status(201).json({ message: 'Item added to cart' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Add item to wishlist
// @route   POST /api/user/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        const itemExists = user.wishlist.find(
            (item) => item.product.toString() === productId
        );

        if (itemExists) {
            // Remove from wishlist if it already exists
            user.wishlist = user.wishlist.filter(item => item.product.toString() !== productId);
            await user.save();
            res.json({ message: 'Item removed from wishlist' });
        } else {
            // Add to wishlist
            user.wishlist.push({ product: productId });
            await user.save();
            res.status(201).json({ message: 'Item added to wishlist' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { addToCart, addToWishlist };