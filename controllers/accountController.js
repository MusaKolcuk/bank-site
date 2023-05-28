const User = require("../models/userModel");
const Account= require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");


// Hesap oluşturma
const createAccount = asyncErrorWrapper(async (req, res, next) => {
    const { userId } = req.body;
    const account = await Account.create({ user: userId });
    res.status(201).json({ success: true, data: account });
});

  // Hesap bilgilerini getirme
const getAccount = asyncErrorWrapper(async (req, res, next) => {
    const { accountId } = req.params;
    const account = await Account.findById(accountId).populate("user");
    if (!account) {
        return res
        .status(404)
        .json({ success: false, error: "Account not found" });
    }
    res.status(200).json({ success: true, data: account });
});


  // Hesap bakiyesini güncelleme
const updateBalance = asyncErrorWrapper(async (req, res, next) => {
    const { accountId } = req.params;
    const { amount, type } = req.body;

    const account = await Account.findById(accountId);
    if (!account) {
        return res
        .status(404)
        .json({ success: false, error: "Account not found" });
    }

    let updatedBalance = account.balance;

    if (type === "deposit") {
        updatedBalance += amount;
    } else if (type === "withdraw") {
        if (account.balance < amount) {
        return res
        .status(400)
        .json({ success: false, error: "Insufficient balance" });
    }
    updatedBalance -= amount;
    }

    account.balance = updatedBalance;
    await account.save();

    // İşlem kaydı oluşturma
    await Transaction.create({
        account: accountId,
        type,
        amount,
    });

    res.status(200).json({ success: true, data: account });
});

module.exports = { createAccount, getAccount, updateBalance };
