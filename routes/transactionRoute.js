const express = require("express");
const { deposit, withdraw, getTransactions, deleteAllTransactions } = require("../controllers/transcationController");
const { getAccessToRoute,  } = require("../middlewares/authorization/auth");


const router = express.Router();

router.post("/:accountId/deposit", getAccessToRoute, deposit);
router.post("/:accountId/withdraw", getAccessToRoute, withdraw);
router.get("/:accountId", getAccessToRoute, getTransactions);
router.delete("/:accountId", getAccessToRoute, deleteAllTransactions);

module.exports = router;
