const express = require("express");
const router = express.Router();
const anotherApiController = require('../controllers/anotherApi')

router.get('/guygani', anotherApiController.GET_FROM_ANOTHER_API)

module.exports = router