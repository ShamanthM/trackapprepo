// src/services/userService.js
const User = require('../models/user');

class UserService {
  static async getAllUsers() {
    return await User.findAll();
  }

  static async getUserByUsername(username) {
    return await User.findOne({ where: { UserName: username } });
  }

  static async getUserById(userId) {
    return await User.findByPk(userId);
  }

  static async createUser(user) {
    return await User.create(user);
  }

  static async updateUser(userId, updatedUserData) {
    return await User.update(updatedUserData, { where: { UserID: userId } });
  }

  static async deleteUser(userId) {
    return await User.destroy({ where: { UserID: userId } });
  }
}

module.exports = UserService;
