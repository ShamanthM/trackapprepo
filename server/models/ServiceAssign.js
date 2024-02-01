const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../context/sequelize-config');

const ServiceAssign = sequelize.define(
  'ServiceAssign',
  {
    AssignmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ServiceStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'ServiceAssignments',
  }
);

module.exports = ServiceAssign;
