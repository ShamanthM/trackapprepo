// src/routes/accessoryRoutes.js
const express = require('express');
const router = express.Router();
const AccessoryController = require('../controllers/accessoryController');

router.get('/', AccessoryController.getAllAccessories);
router.get('/:accessoryId', AccessoryController.getAccessoryById);
router.post('/', AccessoryController.createAccessory);
router.put('/:accessoryId', AccessoryController.updateAccessory);
router.delete('/:accessoryId', AccessoryController.deleteAccessory);

module.exports = router;
