// controllers/userProductAccessoryController.js
const UserProductAccessoryService = require('../services/userProductAccessoryService');

class UserProductAccessoryController {
  static async getUserProductAccessoriesDetails(req, res) {
    const { userName } = req.params;
    try {
      const result = await UserProductAccessoryService.getUserProductAccessoriesDetails(userName);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserProductAccessoryController;