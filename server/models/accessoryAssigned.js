// models/AccessoryAssigned.js
const { DataTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

const AccessoryAssigned = sequelize.define(
  'AccessoryAssigned',
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
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'AccessoriesAssigned',
  }
);

module.exports = AccessoryAssigned;
