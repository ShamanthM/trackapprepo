const express = require('express');
const { body } = require('express-validator');
const ProductAccessoryController = require('../controllers/productAccessoryController');

const router = express.Router();

router.get('/', ProductAccessoryController.getAllProductAccessories);

router.get('/:productId', ProductAccessoryController.getProductAccessoryByProductId);

router.post(
  '/',
  [
    body('ProductID').notEmpty().isInt(),
    body('AccessoryID').notEmpty().isInt(),
    body('Quantity').notEmpty().isInt(),
  ],
  ProductAccessoryController.createProductAccessory
);

router.put(
  '/',
  [
    body('ProductID').notEmpty().isInt(),
    body('AccessoryID').notEmpty().isInt(),
    body('Quantity').notEmpty().isInt(),
  ],
  ProductAccessoryController.updateProductAccessory
);

router.delete('/', ProductAccessoryController.deleteProductAccessory);

// Corrected route for fetching accessory report based on product ID
router.get('/report/:productId', ProductAccessoryController.getProductAccessoryByProductId);

module.exports = router;
