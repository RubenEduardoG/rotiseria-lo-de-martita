const express = require('express');
const router = express.Router();
const { getProducts, updatePrice } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.patch('/:id', authMiddleware, updatePrice);

module.exports = router;
