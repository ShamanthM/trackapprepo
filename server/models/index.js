// models/index.js
const User = require('./user');
const Product = require('./product');
const Accessory = require('./accessory');
const ProductAccessory = require('./productAccessory');
const UserProductAssignment = require('./userProductAssignment');
const AccessoryAssigned = require('./accessoryAssigned');

// Associations
User.hasMany(UserProductAssignment, { foreignKey: 'UserID' });
User.hasMany(AccessoryAssigned, { foreignKey: 'UserID' });
Product.hasMany(UserProductAssignment, { foreignKey: 'ProductID' });
Product.hasMany(ProductAccessory, { foreignKey: 'ProductID' });
Accessory.hasMany(ProductAccessory, { foreignKey: 'AccessoryID' });
Accessory.hasMany(AccessoryAssigned, { foreignKey: 'AccessoryID' });

// Sync the Database
async function syncDatabase() {
  try {
    await User.sync();
    await Product.sync();
    await Accessory.sync();
    await ProductAccessory.sync();
    await UserProductAssignment.sync();
    await AccessoryAssigned.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();

module.exports = {
  User,
  Product,
  Accessory,
  ProductAccessory,
  UserProductAssignment,
  AccessoryAssigned,
};
