// src/controllers/accessoryAssignedController.js
const AccessoryAssignedService = require('../services/accessoryAssignedService');

class AccessoryAssignedController {
  static async getAccessoriesAssignedByUserId(req, res) {
    const { userId } = req.params;
    try {
      const accessoriesAssigned = await AccessoryAssignedService.getAccessoriesAssignedByUserId(userId);
      res.json(accessoriesAssigned);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createAccessoryAssigned(req, res) {
    const newAccessoryAssigned = req.body;
    try {
      const createdAccessoryAssigned = await AccessoryAssignedService.createAccessoryAssigned(newAccessoryAssigned);
      res.status(201).json(createdAccessoryAssigned);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateAccessoryAssigned(req, res) {
    const { accessoryAssignedId } = req.params;
    const updatedAccessoryAssignedData = req.body;
    try {
      await AccessoryAssignedService.updateAccessoryAssigned(accessoryAssignedId, updatedAccessoryAssignedData);
      res.status(200).json({ message: 'Accessory Assigned updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteAccessoryAssigned(req, res) {
    const { accessoryAssignedId } = req.params;
    try {
      await AccessoryAssignedService.deleteAccessoryAssigned(accessoryAssignedId);
      res.status(200).json({ message: 'Accessory Assigned deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AccessoryAssignedController;
