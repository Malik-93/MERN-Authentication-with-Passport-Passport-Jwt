const express = require("express");
const router = express.Router();
const usersControllers = require('../controllers/users')
const passport = require('passport')
require('../config/passport')(passport)

router.post('/register', usersControllers.REGISTER_USER)

router.post('/login', usersControllers.LOGIN_USER)

router.post('/auth/facebook/token',
    passport.authenticate('facebook-token', {session: false}, usersControllers.FACEBOOK_LOGIN_TOKEN)
)
router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }, usersControllers.FACEBOOK_LOGIN) )
router.get('/emailConfirmation/:token', usersControllers.EMAIL_CONFIRM)
router.post('/resendEmailToken', usersControllers.RESEND_EMAIL_CONFIRMATION)
router.get('/addCookie', usersControllers.ADD_USER_COOKIE)
router.get('/getCookie', usersControllers.GET_USER_COOKIE)

module.exports =  router