// services/serviceAssignService.js
const { ServiceAssign } = require('../models/ServiceAssign');

const createServiceAssignment = async (assignmentData) => {
  try {
    const serviceAssignment = await ServiceAssign.create(assignmentData);
    return serviceAssignment;
  } catch (error) {
    console.error('Error creating service assignment:', error);
    throw new Error(`Error creating service assignment: ${error.message}`);
  }
};

const getAllServiceAssignments = async () => {
  try {
    console.log('Before findAll');
    const serviceAssignments = await ServiceAssign.findAll();
    console.log('After findAll');
    return serviceAssignments;
  } catch (error) {
    console.error('Error fetching service assignments:', error);
    throw new Error(`Error fetching service assignments: ${error.message}`);
  }
};

const getServiceAssignmentById = async (assignmentId) => {
  try {
    const serviceAssignment = await ServiceAssign.findByPk(assignmentId);
    return serviceAssignment;
  } catch (error) {
    console.error('Error fetching service assignment:', error);
    throw new Error(`Error fetching service assignment: ${error.message}`);
  }
};

const updateServiceAssignment = async (assignmentId, updatedData) => {
  try {
    const [rowsAffected, [updatedAssignment]] = await ServiceAssign.update(updatedData, {
      where: { AssignmentID: assignmentId },
      returning: true,
    });

    if (rowsAffected === 0) {
      throw new Error(`Service assignment with ID ${assignmentId} not found.`);
    }

    return updatedAssignment;
  } catch (error) {
    console.error('Error updating service assignment:', error);
    throw new Error(`Error updating service assignment: ${error.message}`);
  }
};

const deleteServiceAssignment = async (assignmentId) => {
  try {
    const rowsAffected = await ServiceAssign.destroy({
      where: { AssignmentID: assignmentId },
    });

    if (rowsAffected === 0) {
      throw new Error(`Service assignment with ID ${assignmentId} not found.`);
    }
  } catch (error) {
    console.error('Error deleting service assignment:', error);
    throw new Error(`Error deleting service assignment: ${error.message}`);
  }
};

module.exports = {
  createServiceAssignment,
  getAllServiceAssignments,
  getServiceAssignmentById,
  updateServiceAssignment,
  deleteServiceAssignment,
};
