const { Sequelize } = require('sequelize');
const ProductAccessory = require('../models/ProductAccessory');

class ProductAccessoryService {
  static async getAllProductAccessories() {
    return await ProductAccessory.findAll();
  }

  static async createProductAccessory({ ProductID, AccessoryID, Quantity }) {
    return await ProductAccessory.create({
      ProductID,
      AccessoryID,
      Quantity,
    });
  }

  static async updateProductAccessory({ ProductID, AccessoryID, Quantity }) {
    const productAccessory = await ProductAccessory.findOne({
      where: { ProductID, AccessoryID },
    });

    if (!productAccessory) {
      return null;
    }

    productAccessory.Quantity = Quantity;
    await productAccessory.save();
    return productAccessory;
  }

  static async deleteProductAccessory({ ProductID, AccessoryID }) {
    const productAccessory = await ProductAccessory.findOne({
      where: { ProductID, AccessoryID },
    });

    if (!productAccessory) {
      return false;
    }

    await productAccessory.destroy();
    return true;
  }

  static async getProductAccessoryByProductId(productId) {
    const query = `
      SELECT
        P.ProductName AS Product,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'AccessoryName', A.AccessoryName,
            'Quantity', PA.Quantity
          )
        ) AS Accessories
      FROM
        Products P
      JOIN
        ProductAccessories PA ON P.ProductID = PA.ProductID
      JOIN
        Accessories A ON PA.AccessoryID = A.AccessoryID
      WHERE
        P.ProductID = :productId
      GROUP BY
        P.ProductID;
    `;

    try {
      const [results] = await ProductAccessory.sequelize.query(query, {
        replacements: { productId },
        type: Sequelize.QueryTypes.SELECT,
      });

      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductAccessoryService;

// Example code for calling methods
const getProductAccessories = async () => {
  try {
    // Get all product accessories
    const allProductAccessories = await ProductAccessoryService.getAllProductAccessories();
    console.log('All Product Accessories:', allProductAccessories);

    // Create a new product accessory
    const newProductAccessory = await ProductAccessoryService.createProductAccessory({
      ProductID: 1,
      AccessoryID: 2,
      Quantity: 3,
    });
    console.log('New Product Accessory:', newProductAccessory);

    // Update an existing product accessory
    const updatedProductAccessory = await ProductAccessoryService.updateProductAccessory({
      ProductID: 1,
      AccessoryID: 2,
      Quantity: 5,
    });
    console.log('Updated Product Accessory:', updatedProductAccessory);

    // Delete a product accessory
    const isDeleted = await ProductAccessoryService.deleteProductAccessory({
      ProductID: 1,
      AccessoryID: 2,
    });
    console.log('Is Product Accessory Deleted:', isDeleted);

    // Get product accessories by productId
    const productId = 1; // Replace with the actual productId
    const productAccessories = await ProductAccessoryService.getProductAccessoryByProductId(productId);
    console.log('Product Accessories by Product ID:', productAccessories);
  } catch (error) {
    console.error('Error:', error);
  }
};

getProductAccessories();
