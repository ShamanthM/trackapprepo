// routes/userProductAccessoryRoutes.js
const express = require('express');
const router = express.Router();
const UserProductAccessoryController = require('../controllers/userProductAccessoryController');

router.get('/getUserProductAccessoriesDetails/:userName', UserProductAccessoryController.getUserProductAccessoriesDetails);

module.exports = router;
