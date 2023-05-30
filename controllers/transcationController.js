const User = require("../models/userModel");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Account= require("../models/accountModel");
const Transaction = require("../models/transactionModel");

// Para yatırma işlemi
const deposit = asyncErrorWrapper(async (req, res, next) => {
    const { accountId } = req.params;
    const { amount, accountType } = req.body;

const account = await Account.findById(accountId);
    if (!account) {
        return res
            .status(404)
            .json({ success: false, error: "Account not found" });
    }

    if (account.accountType !== accountType) {
        return res
            .status(400)
            .json({ success: false, error: "Invalid account type" });
    }

    let updatedBalance = account.balance + amount;

    account.balance = updatedBalance;
    await account.save();

    // İşlem kaydı oluşturma
    const transaction = await Transaction.create({
        account: accountId,
        type: "deposit",
        amount,
    });

    res.status(200).json({ success: true, data: account });
});

// Para çekme işlemi
const withdraw = asyncErrorWrapper(async (req, res, next) => {
    const { accountId } = req.params;
    const { amount, accountType } = req.body;

    const account = await Account.findById(accountId);
    if (!account) {
        return res
            .status(404)
            .json({ success: false, error: "Account not found" });
    }

    if (account.accountType !== accountType) {
        return res
            .status(400)
            .json({ success: false, error: "Invalid account type" });
    }

    if (account.balance < amount) {
        return res
            .status(400)
            .json({ success: false, error: "Insufficient balance" });
    }

    let updatedBalance = account.balance - amount;

    account.balance = updatedBalance;
    await account.save();

    // İşlem kaydı oluşturma
    const transaction = await Transaction.create({
        account: accountId,
        type: "withdraw",
        amount,
    });

    res.status(200).json({ success: true, data: account });
    });


// Hesap hareketlerini getirme
    const getTransactions = asyncErrorWrapper(async (req, res, next) => {
        const { accountId } = req.params;
        const transactions = await Transaction.find({ account: accountId });
        res.status(200).json({ success: true, data: transactions });
    });


// Tüm işlemleri silme
const deleteAllTransactions = asyncErrorWrapper(async (req, res, next) => {
    const { accountId } = req.params;
    const transactions = await Transaction.deleteMany({ account: accountId });
    res.status(200).json({ success: true, data: transactions });
});



    module.exports = {
    deposit,
    withdraw,
    getTransactions,
    deleteAllTransactions,
};