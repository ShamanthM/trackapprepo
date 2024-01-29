// src/services/accessoryService.js
const Accessory = require('../models/accessory');

class AccessoryService {
  static async getAllAccessories() {
    return await Accessory.findAll();
  }

  static async getAccessoryById(accessoryId) {
    return await Accessory.findByPk(accessoryId);
  }

  static async createAccessory(accessory) {
    return await Accessory.create(accessory);
  }

  static async updateAccessory(accessoryId, updatedAccessoryData) {
    return await Accessory.update(updatedAccessoryData, { where: { AccessoryID: accessoryId } });
  }

  static async deleteAccessory(accessoryId) {
    return await Accessory.destroy({ where: { AccessoryID: accessoryId } });
  }
}

module.exports = AccessoryService;
