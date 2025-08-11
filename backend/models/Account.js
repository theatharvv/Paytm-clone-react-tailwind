const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    credit: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    debit: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    transactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            username: {
                type: String,
                required: true
            },
            moneySent: {
                type: Number,
                required: true,
                min: 0,
            },
            type: {
                type: String,
                enum: ['credit', 'debit'],
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]

})

module.exports = mongoose.model("Account", accountSchema);