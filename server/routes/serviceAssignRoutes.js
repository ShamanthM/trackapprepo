const express = require('express');
const router = express.Router();
const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require('../controllers/serviceAssignController');

// Create a new service assignment
router.post('/', createAssignment);

// Get all service assignments
router.get('/', getAllAssignments);

// Get a specific service assignment by ID
router.get('/:assignmentId', getAssignmentById);

// Update a service assignment by ID
router.put('/:assignmentId', updateAssignment);

// Delete a service assignment by ID
router.delete('/:assignmentId', deleteAssignment);

module.exports = router;
