// src/services/accessoryAssignedService.js
const AccessoryAssigned = require('../models/accessoryAssigned');

class AccessoryAssignedService {
  static async getAccessoriesAssignedByUserId(userId) {
    return await AccessoryAssigned.findAll({ where: { UserID: userId } });
  }

  static async createAccessoryAssigned(accessoryAssigned) {
    return await AccessoryAssigned.create(accessoryAssigned);
  }

  static async updateAccessoryAssigned(accessoryAssignedId, updatedAccessoryAssignedData) {
    return await AccessoryAssigned.update(updatedAccessoryAssignedData, {
      where: { AccessoryAssignedID: accessoryAssignedId },
    });
  }

  static async deleteAccessoryAssigned(accessoryAssignedId) {
    return await AccessoryAssigned.destroy({ where: { AccessoryAssignedID: accessoryAssignedId } });
  }
}

module.exports = AccessoryAssignedService;
