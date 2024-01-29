// src/controllers/accessoryController.js
const AccessoryService = require('../services/accessoryService');

class AccessoryController {
  static async getAllAccessories(req, res) {
    try {
      const accessories = await AccessoryService.getAllAccessories();
      res.json(accessories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAccessoryById(req, res) {
    const { accessoryId } = req.params;
    try {
      const accessory = await AccessoryService.getAccessoryById(accessoryId);
      if (!accessory) {
        res.status(404).json({ error: 'Accessory not found' });
      } else {
        res.json(accessory);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createAccessory(req, res) {
    const newAccessory = req.body;
    try {
      const createdAccessory = await AccessoryService.createAccessory(newAccessory);
      res.status(201).json(createdAccessory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateAccessory(req, res) {
    const { accessoryId } = req.params;
    const updatedAccessoryData = req.body;
    try {
      await AccessoryService.updateAccessory(accessoryId, updatedAccessoryData);
      res.status(200).json({ message: 'Accessory updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteAccessory(req, res) {
    const { accessoryId } = req.params;
    try {
      await AccessoryService.deleteAccessory(accessoryId);
      res.status(200).json({ message: 'Accessory deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AccessoryController;
