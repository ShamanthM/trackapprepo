const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql', // Use 'mssql' for Microsoft Azure SQL Database
  host: 'quickcart1.database.windows.net',
  port: 1433,
  database: 'testdb',
  username: 'akshay',
  password: 'Aksquickcart98@',
  define: {
    timestamps: false,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    options: {
      encrypt: true, // For Microsoft Azure SQL Database
    },
  },
});

module.exports = sequelize;