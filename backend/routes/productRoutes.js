const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController.js');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;