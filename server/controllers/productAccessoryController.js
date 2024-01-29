// src/controllers/productAccessoryController.js
const ProductAccessoryService = require('../services/productAccessoryService');

class ProductAccessoryController {
  static async getProductAccessoriesByProductId(req, res) {
    const { productId } = req.params;
    try {
      const productAccessories = await ProductAccessoryService.getProductAccessoriesByProductId(productId);
      res.json(productAccessories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createProductAccessory(req, res) {
    const newProductAccessory = req.body;
    try {
      const createdProductAccessory = await ProductAccessoryService.createProductAccessory(newProductAccessory);
      res.status(201).json(createdProductAccessory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateProductAccessory(req, res) {
    const { productAccessoryId } = req.params;
    const updatedProductAccessoryData = req.body;
    try {
      await ProductAccessoryService.updateProductAccessory(productAccessoryId, updatedProductAccessoryData);
      res.status(200).json({ message: 'Product Accessory updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteProductAccessory(req, res) {
    const { productAccessoryId } = req.params;
    try {
      await ProductAccessoryService.deleteProductAccessory(productAccessoryId);
      res.status(200).json({ message: 'Product Accessory deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = ProductAccessoryController;
