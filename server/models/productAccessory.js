// models/ProductAccessory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

const ProductAccessory = sequelize.define(
  'ProductAccessory',
  {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    AccessoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'ProductAccessories',
  }
);

module.exports = ProductAccessory;
