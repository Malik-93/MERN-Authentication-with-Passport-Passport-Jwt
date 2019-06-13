const express = require("express");
const router = express.Router();
const usersControllers = require('../controllers/users')

router.post('/register', usersControllers.REGISTER_USER)

router.post('/login', usersControllers.LOGIN_USER)

module.exports = router