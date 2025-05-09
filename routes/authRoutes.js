const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const sanitize = require('../config/sanitizer');

router.post('/signup',sanitize(),  authController.signup);

module.exports = router;
