const express = require('express')
const {getAccessToRoute,} = require("../middlewares/authorization/auth");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const { login, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);



module.exports = router;