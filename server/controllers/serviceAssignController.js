const ServiceAssign = require('../models/ServiceAssign');
const { validationResult } = require('express-validator');
const ServiceAssignService = require('../services/serviceAssignService');

class ServiceAssignController {
  static async getAllServiceAssignments(req, res, next) {
    try {
      const serviceAssignments = await ServiceAssignService.getAllServiceAssignments();
      res.json(serviceAssignments);
    } catch (error) {
      next(error);
    }
  }

  static async getServiceAssignmentById(req, res, next) {
    const assignmentId = req.params.id;
    try {
      const serviceAssignment = await ServiceAssignService.getServiceAssignmentById(assignmentId);
      if (!serviceAssignment) {
        res.status(404).json({ message: 'Service Assignment not found' });
      } else {
        res.json(serviceAssignment);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createServiceAssignment(req, res, next) {
    const { UserID, ProductName, SerialNumber, ServiceStatus, Description } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newServiceAssignment = await ServiceAssignService.createServiceAssignment({
        UserID,
        ProductName,
        SerialNumber,
        ServiceStatus,
        Description,
      });

      res.status(201).json(newServiceAssignment);
    } catch (error) {
      next(error);
    }
  }

  static async updateServiceAssignment(req, res, next) {
    const assignmentId = req.params.id;
    const { UserID, ProductName, SerialNumber, ServiceStatus, Description } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedServiceAssignment = await ServiceAssignService.updateServiceAssignment(assignmentId, {
        UserID,
        ProductName,
        SerialNumber,
        ServiceStatus,
        Description,
      });

      if (!updatedServiceAssignment) {
        res.status(404).json({ message: 'Service Assignment not found' });
      } else {
        res.json(updatedServiceAssignment);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteServiceAssignment(req, res, next) {
    const assignmentId = req.params.id;

    try {
      const isDeleted = await ServiceAssignService.deleteServiceAssignment(assignmentId);

      if (!isDeleted) {
        res.status(404).json({ message: 'Service Assignment not found' });
      } else {
        res.json({ message: 'Service Assignment deleted successfully' });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceAssignController;
