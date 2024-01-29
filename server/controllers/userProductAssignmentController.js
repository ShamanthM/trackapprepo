// src/controllers/userProductAssignmentController.js
const UserProductAssignmentService = require('../services/userProductAssignmentService');

class UserProductAssignmentController {
  static async getUserAssignmentsByUserId(req, res) {
    const { userId } = req.params;
    try {
      const userAssignments = await UserProductAssignmentService.getUserAssignmentsByUserId(userId);
      res.json(userAssignments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createUserProductAssignment(req, res) {
    const newUserProductAssignment = req.body;
    try {
      const createdUserProductAssignment = await UserProductAssignmentService.createUserProductAssignment(
        newUserProductAssignment
      );
      res.status(201).json(createdUserProductAssignment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateUserProductAssignment(req, res) {
    const { assignmentId } = req.params;
    const updatedAssignmentData = req.body;
    try {
      await UserProductAssignmentService.updateUserProductAssignment(assignmentId, updatedAssignmentData);
      res.status(200).json({ message: 'User Product Assignment updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUserProductAssignment(req, res) {
    const { assignmentId } = req.params;
    try {
      await UserProductAssignmentService.deleteUserProductAssignment(assignmentId);
      res.status(200).json({ message: 'User Product Assignment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserProductAssignmentController;
