// src/routes/userProductAssignmentRoutes.js
const express = require('express');
const router = express.Router();
const UserProductAssignmentController = require('../controllers/userProductAssignmentController');

router.get('/user/:userId', UserProductAssignmentController.getUserAssignmentsByUserId);
router.post('/', UserProductAssignmentController.createUserProductAssignment);
router.put('/:assignmentId', UserProductAssignmentController.updateUserProductAssignment);
router.delete('/:assignmentId', UserProductAssignmentController.deleteUserProductAssignment);

module.exports = router;
