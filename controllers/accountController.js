const User = require("../models/userModel");
const Account= require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");


// Hesap oluşturma
const createAccount = asyncErrorWrapper(async (req, res, next) => {
    const { userId, accountType } = req.body;

    const account = await Account.create({ user: userId, accountType });

// Kullanıcı modelindeki accounts alanını güncelleme
    await User.findByIdAndUpdate(userId, { $push: { accounts: account._id } });

    res.status(201).json({ success: true, data: account });
});

1// Hesap bilgilerini getirme
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





module.exports = { createAccount, getAccount, };
