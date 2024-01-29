// models/Accessory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

const accessory = sequelize.define(
  'Accessory',
  {
    AccessoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AccessorySerialNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccessoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'Accessories',
  }
);

module.exports = accessory;
