const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { createTransaction, getTransactions } = require("../controllers/transcationController");

const router = express.Router();

router.post("/create", getAccessToRoute, createTransaction);
router.get("/:accountId", getAccessToRoute, getTransactions);

module.exports = router;

