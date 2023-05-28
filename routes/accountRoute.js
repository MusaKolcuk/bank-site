const express = require("express");
const { createAccount, getAccount } = require("../controllers/accountController");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/create", getAccessToRoute, createAccount);
router.get("/:accountId", getAccessToRoute, getAccount);



module.exports = router;
