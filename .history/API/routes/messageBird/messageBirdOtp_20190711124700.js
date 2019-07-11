const express = require('express');
const router = express.Router();
const messageBirdController = require('../controllers/messageBird/messageBirdOtp')
router.post('/sendOTP', messageBirdController.SEND_OTP)
router.post('/verifyOTP', messageBirdController.VERIFY_OTP)

module.exports = router