const Mobicash = require('../db/models/Mobicash');

exports.MOBICASH_PAYMENT = (req, res, next) => {
    console.log('Mobicash response :', req.body)
    const {
        pp_Amount,
        pp_BillReference,
        pp_ResponseCode,
        pp_TxnCurrency,
        pp_TxnDateTime,
        pp_TxnRefNo,
        pp_ResponseMessage
    } = req.body
    Mobicash.findOne({pp_TxnRefNo})
    .exec()
    .then(trx => {
        if(trx) {
            return res.status(401).json({success: true, message: 'Transaction already exist'})
        } else if(pp_ResponseCode === 157) {
            res.status(401).json({ success: true, message: pp_ResponseMessage})
        }
        const newMobicash = new Mobicash({
            pp_TxnRefNo,
            pp_Amount,
            pp_TxnCurrency,
            pp_BillReference,
            pp_TxnDateTime
        })
        newMobicash.save()
        .then(result => {
            return res.status(200).json({
               success: true, 
               data: result
           })
        })
    })

}