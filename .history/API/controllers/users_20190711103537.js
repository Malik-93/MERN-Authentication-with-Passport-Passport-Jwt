const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const User = require('../db/models/Users');
const Token = require('../db/models/Token');
const keys = require("../config/keys");
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
exports.REGISTER_USER = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(409).json({ email: 'Email already exists' })
            }
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({ success: false, Error: 'Error During bcrypt.genSalt :', err })
                }
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ Error: 'Error During bcrypt.hash: ', err })
                    } else {
                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            confPassword: hash
                        })
                        newUser.save()
                            .then(user => {
                                const payload = {
                                    _id: user._id,
                                    name: user.name
                                }
                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                                    if (err) {
                                        return res.status(500).json({ success: false, Error: 'Error During jwt sign token' })
                                    }
                                    const newToken = new Token({ _userId: user._id, token: token })
                                    newToken.save()
                                        .then(userToken => {
                                            const url = `http://localhost:5000/api/users/emailConfirmation/${userToken.token}`
                                            const transporter = nodeMailer.createTransport(smtpTransport({
                                                service: 'gmail',
                                                host: 'smtp.gmail.com',
                                                port: 465,
                                                secure: true,
                                                auth: {
                                                    user: require('../config/keys').gmailAccount,
                                                    pass: require('../config/keys').gmailPassword
                                                },
                                                tls: {
                                                    rejectUnauthorized: false
                                                }
                                            }));
                                            const mailOptions = {
                                                from: require('../config/keys').gmailAccount,
                                                to: req.body.email,
                                                subject: 'Confirm Email',
                                                html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
                                            }

                                            transporter.sendMail(mailOptions, (err, info) => {
                                                if (err) {
                                                    console.log('Error during send email : ', err)
                                                    // return res.status(500).json({ success: false, Error: 'Error During send email' })
                                                }
                                                console.log('Email sent success : ', info.response)

                                                //    return res.status(200).json({ success: true, message: 'Email Sent Successfully', info: info.response })
                                            })

                                            console.log('Token saved successfully: ', userToken.token)
                                            // return res.status(201).json({ success: true, Messsage: 'Token saved successfully', token: userToken })
                                            res.status(201).json({ success: true, message: `An Email Link has been sent to your email: ${req.body.email} please verify your email for Login!`, data: user, token: userToken.token })
                                        })
                                })
                            })
                            .catch(err => {
                                res.status(500).json({ success: false, Error: 'Internal server Error During user creation :', err })
                            })
                     }
                })
            })
        })
}

exports.EMAIL_CONFIRM = (req, res, next) => {
    const token = req.params.token
    Token.findOne({ token })
        .populate('_userId')
        .exec()
        .then(userToken => {
            if (!userToken) {
                return res.status(404).json({ success: false, message: 'Token not found' })
            }
            const { _userId } = userToken
            User.findOne({ _id: _userId._id, })
                .exec()
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' })
                    }
                    if (user.isVerified) {
                        return res.status(409).json({ message: 'User already verified' })
                    }
                    user.isVerified = true
                    user.save((err, user) => {
                        if (err) {
                            return res.status(500).json({ success: false, Error: 'Error during save verified user :', err })
                        }
                        return res.json({ 
                            Message: 'Email Confirmed Successfully:', 
                            token: userToken.token, 
                            user,
                     })
                    })
                })
        })
        .catch(err => {
            res.status(500).json({ success: false, Error: 'Internal server error during confirm email: ', err })
        })

}

exports.RESEND_EMAIL_CONFIRMATION = (req, res, next) => {
    const { email } = req.body
    User.findOne({ email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ auth: false, message: 'User not found' })
            }
            if (user.isVerified) {
                return res.status(409).json({ message: 'user already verified' })
            }
            const payload = {
                _id: user._id,
                name: user.name
            }
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                if (err) {
                    res.status(500).json({ success: false, Error: 'Error during generate token :', err })
                }
                const newToken = new Token({ _userId: user._id, token })
                newToken.save()
                    .exec()
                    .then(userToken => {
                        if (!userToken) {
                            res.status(500).json({ success: false, Error: 'Error during save token in db : ' })
                        }
                        const url = `http://localhost:3000/login/${userToken.token}`
                        const transporter = nodeMailer.createTransport(smtpTransport({
                            service: 'gmail',
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'laherasif@gmail.com',
                                pass: 'mian6565'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        }));
                        const mailOptions = {
                            from: 'laherasif@gmail.com',
                            to: req.body.email,
                            subject: 'Confirm Email',
                            html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
                        }
                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                console.log('Error during email send :', err)
                            }
                            console.log('Email sent success : ', info.response)
                        })
                        console.log('Token saved successfully :', usertoken.token)
                    })
                res.status(201).json({ success: true, message: `An Email Link has been sent to your email: ${req.body.email} please verify your email for Login!`, data: user, token: userToken.token })
            })

        })
}

exports.LOGIN_USER = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
       return res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email }).exec()
        .then(user => {
            if (!user) {
               return res.status(404).json({ emailNotFound: 'Email not found' })
            } else if (!user.isVerified) {
                return res.status(401).json({ success: false, emailNotVerified: 'Your email is not verified yet!' })
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //jwt_payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    }
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                        if (err) throw err;
                       return res.status(200).json({ success: true, message: 'Successfully Logged In', token: "Bearer" + " " + token })
                    })
                } else {
                    return res.status(401).json({ success: false, passwordIncorrect: 'Password incorrect' })
                }
            })
        })
        .catch(err => {
            res.status(500).json({ success: false, Error: 'Internal server error during sign in uesr: ', err })
        })
}

exports.ADD_USER_COOKIE = (req, res, next) => {
    const user = req.body.user
    res.cookie('User', user, { maxAge: 300, httpOnly: true } )
    return res.status(200).json({ message: 'Cookie set successfully :', user  })
}

exports.GET_USER_COOKIE = (req, res, next) => {
    console.log(req.cookies)
    const user = req.cookies['user']
    if (user) {
        return res.status(200).json({ success: true, message: user})
    }
    return res.status(404).json({ message: 'Cookie not found' })
}

exports.FACEBOOK_LOGIN_TOKEN = (req, res, next) => {
    console.log('req.user', req.user)
}

exports.FACEBOOK_LOGIN = (req, res, next) => {
    console.log('REQ.USER :', req.user)
}
