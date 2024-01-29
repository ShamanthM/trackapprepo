// src/services/productAccessoryService.js
const ProductAccessory = require('../models/productAccessory');

class ProductAccessoryService {
  static async getProductAccessoriesByProductId(productId) {
    return await ProductAccessory.findAll({ where: { ProductID: productId } });
  }

  static async createProductAccessory(productAccessory) {
    return await ProductAccessory.create(productAccessory);
  }

  static async updateProductAccessory(productAccessoryId, updatedProductAccessoryData) {
    return await ProductAccessory.update(updatedProductAccessoryData, {
      where: { ProductAccessoryID: productAccessoryId },
    });
  }

  static async deleteProductAccessory(productAccessoryId) {
    return await ProductAccessory.destroy({ where: { ProductAccessoryID: productAccessoryId } });
  }
}

module.exports = ProductAccessoryService;
