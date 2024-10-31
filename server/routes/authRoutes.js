const express = require('express');
const { signup, login, resetPassword } = require('../controllers/authController');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Reset password route
router.post('/reset-password', resetPassword);

module.exports = router;