const express = require("express");
const { createAccount, getAccount, updateBalance } = require("../controllers/accountController");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/create", getAccessToRoute, createAccount);
router.get("/:accountId", getAccessToRoute, getAccount);
router.put("/:accountId/update-balance", getAccessToRoute, updateBalance);

module.exports = router;
