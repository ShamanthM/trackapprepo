const ProductAccessoryService = require('../services/productAccessoryService');
const { validationResult } = require('express-validator');

class ProductAccessoryController {
  static async getAllProductAccessories(req, res, next) {
    try {
      const productAccessories = await ProductAccessoryService.getAllProductAccessories();
      res.json(productAccessories);
    } catch (error) {
      next(error);
    }
  }

  static async getProductAccessoryByProductId(req, res, next) {
    const productId = req.params.productId;
    try {
      const productAccessories = await ProductAccessoryService.getProductAccessoryByProductId(productId);
      res.json(productAccessories);
    } catch (error) {
      next(error);
    }
  }

  static async createProductAccessory(req, res, next) {
    const { ProductID, AccessoryID, Quantity } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProductAccessory = await ProductAccessoryService.createProductAccessory({
        ProductID,
        AccessoryID,
        Quantity,
      });

      res.status(201).json(newProductAccessory);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductAccessory(req, res, next) {
    const { ProductID, AccessoryID, Quantity } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const productAccessory = await ProductAccessoryService.updateProductAccessory({
        ProductID,
        AccessoryID,
        Quantity,
      });

      if (!productAccessory) {
        res.status(404).json({ message: 'Product Accessory not found' });
      } else {
        res.json(productAccessory);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductAccessory(req, res, next) {
    const { ProductID, AccessoryID } = req.body;

    try {
      const deleted = await ProductAccessoryService.deleteProductAccessory({
        ProductID,
        AccessoryID,
      });

      if (!deleted) {
        res.status(404).json({ message: 'Product Accessory not found' });
      } else {
        res.json({ message: 'Product Accessory deleted successfully' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getProductAccessoryByProductId(req, res, next) {
    const { productId } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const productAccessoryReport = await ProductAccessoryService.getProductAccessoryByProductId(productId);

      console.log(productAccessoryReport);

      if (productAccessoryReport) {
        res.json(productAccessoryReport);
      } else {
        res.status(404).json({ message: 'Product not found or no accessories found for the given product.' });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductAccessoryController;