// src/services/productService.js
const Product = require('../models/product');

class ProductService {
  static async getAllProducts() {
    return await Product.findAll();
  }

  static async getProductById(productId) {
    return await Product.findByPk(productId);
  }

  static async createProduct(product) {
    return await Product.create(product);
  }

  static async updateProduct(productId, updatedProductData) {
    return await Product.update(updatedProductData, { where: { ProductID: productId } });
  }

  static async deleteProduct(productId) {
    return await Product.destroy({ where: { ProductID: productId } });
  }
}

module.exports = ProductService;
