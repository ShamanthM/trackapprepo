const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'z20.h.filess.io',
  port: 3307,
  database: 'trackapp_sooncalmis',
  username: 'trackapp_sooncalmis',
  password: '8e6e531bab35bf8c6c4f15cc58a82a314cfe7cd0',
  define: {
    timestamps: false,
  },
  pool: {
    max: 10, 
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;