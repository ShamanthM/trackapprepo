// src/routes/accessoryAssignedRoutes.js
const express = require('express');
const router = express.Router();
const AccessoryAssignedController = require('../controllers/accessoryAssignedController');

router.get('/user/:userId', AccessoryAssignedController.getAccessoriesAssignedByUserId);
router.post('/', AccessoryAssignedController.createAccessoryAssigned);
router.put('/:accessoryAssignedId', AccessoryAssignedController.updateAccessoryAssigned);
router.delete('/:accessoryAssignedId', AccessoryAssignedController.deleteAccessoryAssigned);

module.exports = router;
