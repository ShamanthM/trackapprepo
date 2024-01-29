// models/UserProductAssignment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

const UserProductAssignment = sequelize.define(
  'UserProductAssignment',
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
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AssignmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'UserProductAssignments',
  }
);

module.exports = UserProductAssignment;
