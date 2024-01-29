// src/services/userProductAssignmentService.js
const UserProductAssignment = require('../models/userProductAssignment');

class UserProductAssignmentService {
  static async getUserAssignmentsByUserId(userId) {
    return await UserProductAssignment.findAll({ where: { UserID: userId } });
  }

  static async createUserProductAssignment(userProductAssignment) {
    return await UserProductAssignment.create(userProductAssignment);
  }

  static async updateUserProductAssignment(assignmentId, updatedAssignmentData) {
    return await UserProductAssignment.update(updatedAssignmentData, {
      where: { AssignmentID: assignmentId },
    });
  }

  static async deleteUserProductAssignment(assignmentId) {
    return await UserProductAssignment.destroy({ where: { AssignmentID: assignmentId } });
  }
}

module.exports = UserProductAssignmentService;
