const express = require('express');
const { body } = require('express-validator');
const ServiceAssignController = require('../controllers/serviceAssignController');

const router = express.Router();

router.get('/', ServiceAssignController.getAllServiceAssignments);

router.get('/:id', ServiceAssignController.getServiceAssignmentById);

router.post(
  '/',
  [
    body('UserID').notEmpty().isInt(),
    body('ProductName').notEmpty(),
    body('SerialNumber').notEmpty(),
    body('ServiceStatus').notEmpty(),
    body('Description').optional(),
  ],
  ServiceAssignController.createServiceAssignment
);

router.put(
  '/:id',
  [
    body('UserID').notEmpty().isInt(),
    body('ProductName').notEmpty(),
    body('SerialNumber').notEmpty(),
    body('ServiceStatus').notEmpty(),
    body('Description').optional(),
  ],
  ServiceAssignController.updateServiceAssignment
);

router.delete('/:id', ServiceAssignController.deleteServiceAssignment);

// Add other routes as needed

module.exports = router;
