const API_KEY = require('../config/keys').messageBirdKey
const messageBird = require('messagebird')(API_KEY)

exports.SEND_OTP = (req, res, next) => {
    const recipients = req.body.recipient   
    messageBird.verify.create(JSON.stringify(recipients), {
       originator: '+923039839093',  
       template: 'Your verification code is %token'
    }, (err, response) => {
        if(err) {
            return res.status(500).json({success: false, Error: 'Error during sending OTP : ', err })
        }
        return res.status(200).json({success: true, response, id: response.id })
    })
}

exports.VERIFY_OTP = (req, res, next) => {
    const id = req.body.id;
    const token = req.body.token
    messageBird.verify.verify(id, token, (err, response) => {
        if(err) {
            return res.status(500).json({success: false, Error: 'Error during verify token :', err })
        }
        return res.status(200).json({success: true, message: 'Verified successfully', data: response })
    })
}