const express = require('express');
const router = express.Router();
const paymentControllers = require('../controllers/payments/payments')
router.post('/mobicash', paymentControllers.MOBICASH_PAYMENT)

module.exports = router