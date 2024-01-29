const { DataTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

const UserProductAccessoriesDetails = sequelize.define(
  'UserProductAccessoriesDetails',
  {
    UserName: {
      type: DataTypes.STRING,
    },
    ProductID: {
      type: DataTypes.INTEGER,
    },
    ProductSerialNumber: {
      type: DataTypes.STRING,
    },
    ProductName: {
      type: DataTypes.STRING,
    },
    ProductDescription: {
      type: DataTypes.TEXT,
    },
    AccessoryID: {
      type: DataTypes.INTEGER,
    },
    AccessorySerialNumber: {
      type: DataTypes.STRING,
    },
    AccessoryName: {
      type: DataTypes.STRING,
    },
    AccessoryDescription: {
      type: DataTypes.TEXT,
    },
    AccessoryQuantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'UserProductAccessoriesDetails',
    timestamps: false,
  }
);

module.exports = UserProductAccessoriesDetails;
