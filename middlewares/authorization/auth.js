const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers");




//bu fonksiyon ile kullanici giriş yapmış mı diye kontrol edilir.
const getAccessToRoute = (req, res, next) => {

    const {JWT_SECRET_KEY} = process.env;
    if(!isTokenIncluded(req)) {                                                                                     //token gonderilmemisse
        return next(new CustomError("You are not authorized to access this route", 401));
    }

    const access_token = getAccessTokenFromHeader(req);                                                             //token gonderilmisse token degiskenine atilir.

    jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decoded) => {                                        //token dogrulanir.
        if(err) {
            return next
                (new CustomError("You are not authorized to access this route", 401));
        }
        req.user = {                                                                                                //token dogrulandiktan sonra kullanici bilgileri req.user degiskenine atilir.
            id: decoded.id,
            name: decoded.name,
            email: decoded.email
        }

        next();
})
};


module.exports = {getAccessToRoute, };
