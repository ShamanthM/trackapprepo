// src/controllers/userController.js
const UserService = require('../services/userService');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  static async createUser(req, res) {
    const newUser = req.body;
    try {
      const createdUser = await UserService.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateUser(req, res) {
    const { userId } = req.params;
    const updatedUserData = req.body;
    try {
      await UserService.updateUser(userId, updatedUserData);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      await UserService.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
