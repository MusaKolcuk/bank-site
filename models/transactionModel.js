const mongoose = require("mongoose");


const TransactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    type: {
        type: String,
        enum: ["deposit", "withdraw"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;