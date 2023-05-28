const User = require("../models/userModel");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Account= require("../models/accountModel");
const Transaction = require("../models/transactionModel");

// Yeni işlem oluşturma
const createTransaction = asyncErrorWrapper(async (req, res, next) => {
  const { account, type, amount } = req.body;

  const transaction = await Transaction.create({
    account,
    type,
    amount,
  });

  res.status(201).json({
    success: true,
    data: transaction,
  });
});

// İşlemleri getirme
const getTransactions = asyncErrorWrapper(async (req, res, next) => {
  const { accountId } = req.params;

  const transactions = await Transaction.find({ account: accountId });

  res.status(200).json({
    success: true,
    data: transactions,
  });
});

module.exports = { createTransaction, getTransactions };