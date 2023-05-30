const User = require("../models/userModel");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");



const login = asyncErrorWrapper(async (req, res, next) => {                         //kullanici login oldugunda token olusturulur ve kullaniciya gonderilir.
    const{email, password} = req.body;

    if(!validateUserInput(email,password)) {
        return next(new CustomError("Please check your login information",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!comparePassword(password, user.password)) {
        return next(new CustomError("Please check your credentails",400));
    }

    sendJwtToClient (user, res);

});


const logout = asyncErrorWrapper(async (req, res, next) => {
    const {NODE_ENV} = process.env;

    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "Logout Successfull"
    })
})




module.exports = { login, logout};
