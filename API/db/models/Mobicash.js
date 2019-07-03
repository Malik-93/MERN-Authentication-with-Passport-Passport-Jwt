const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MobicashSchema = new Schema({
    pp_TxnRefNo: {
        type: String,
        trim: true,
        required: true
    },
    pp_Amount: {
        type: Number,
        trim: true,
        required: true,
    },
    pp_TxnCurrency: {
        type: String,
        trim: true,
        required: true
    },
    pp_BillReference: {
        type: String,
        trim: true,
        required: true
    },
    pp_TxnDateTime: {
        type: Date
    }
})

module.exports = Mobicash = mongoose.model('Mobicash', MobicashSchema)