// AuthenticationController.js
const express = require('express');
const AuthService = require('../services/AuthService');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { UserName, UserPassword } = req.body;
  try {
    const result = await AuthService.validateUser(UserName, UserPassword);

    if (result.success) {
      res.json({ success: true, user: result.user });
    } else {
      res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
