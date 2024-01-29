// src/controllers/productController.js
const ProductService = require('../services/productService');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getProductById(req, res) {
    const { productId } = req.params;
    try {
      const product = await ProductService.getProductById(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createProduct(req, res) {
    const newProduct = req.body;
    try {
      const createdProduct = await ProductService.createProduct(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateProduct(req, res) {
    const { productId } = req.params;
    const updatedProductData = req.body;
    try {
      await ProductService.updateProduct(productId, updatedProductData);
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteProduct(req, res) {
    const { productId } = req.params;
    try {
      await ProductService.deleteProduct(productId);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = ProductController;
