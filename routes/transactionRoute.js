const express = require("express");
const { deposit, withdraw } = require("../controllers/transcationController");
const { getAccessToRoute,  } = require("../middlewares/authorization/auth");


const router = express.Router();

router.post("/:accountId/deposit", getAccessToRoute, deposit);
router.post("/:accountId/withdraw", getAccessToRoute, withdraw);

module.exports = router;
