// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

const Product = sequelize.define(
  'Product',
  {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'Products',
  }
);

module.exports = Product;
