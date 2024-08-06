// models/transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);