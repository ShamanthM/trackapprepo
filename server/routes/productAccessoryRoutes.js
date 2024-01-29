// src/routes/productAccessoryRoutes.js
const express = require('express');
const router = express.Router();
const ProductAccessoryController = require('../controllers/productAccessoryController');

router.get('/product/:productId', ProductAccessoryController.getProductAccessoriesByProductId);
router.post('/', ProductAccessoryController.createProductAccessory);
router.put('/:productAccessoryId', ProductAccessoryController.updateProductAccessory);
router.delete('/:productAccessoryId', ProductAccessoryController.deleteProductAccessory);

module.exports = router;
