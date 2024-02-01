// controllers/serviceAssignController.js
const {
    createServiceAssignment,
    getAllServiceAssignments,
    getServiceAssignmentById,
    updateServiceAssignment,
    deleteServiceAssignment,
  } = require('../services/serviceAssignService');
  
  const createAssignment = async (req, res) => {
    try {
      const assignmentData = req.body;
      const serviceAssignment = await createServiceAssignment(assignmentData);
      res.json(serviceAssignment);
    } catch (error) {
      console.error('Error creating service assignment:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllAssignments = async (req, res) => {
    try {
      const serviceAssignments = await getAllServiceAssignments();
      res.json(serviceAssignments);
    } catch (error) {
      console.error('Error fetching service assignments:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAssignmentById = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const serviceAssignment = await getServiceAssignmentById(assignmentId);
      if (!serviceAssignment) {
        res.status(404).json({ error: 'Service assignment not found.' });
        return;
      }
      res.json(serviceAssignment);
    } catch (error) {
      console.error('Error fetching service assignment:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const updatedData = req.body;
      const updatedAssignment = await updateServiceAssignment(assignmentId, updatedData);
      res.json(updatedAssignment);
    } catch (error) {
      console.error('Error updating service assignment:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      await deleteServiceAssignment(assignmentId);
      res.json({ message: 'Service assignment deleted successfully.' });
    } catch (error) {
      console.error('Error deleting service assignment:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
  };
  