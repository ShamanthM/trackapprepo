const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql', 
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
      encrypt: true, 
    },
  },
});

module.exports = sequelize;