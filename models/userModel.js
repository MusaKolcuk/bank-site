const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");                           //crypto modulu ile random string olusturacagiz. (reset password icin)

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,           //email formati kontrol edildi.
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length 6"],
        required: [true, "Please provide a password"],
        select: false,                                              //select false yapmamizin sebebi eger getAllUsers diye bir fonksiyon tanimlarsak password alanimizin degerinin gorulmemesi icin.
    },
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

// UserSchema methods

// Bu fonksiyon ile password hashlendi.
UserSchema.methods.generateJwtFromUser = function() {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    const payload = {
        id: this._id,
        name: this.name,
        email: this.email
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {               //jwt sign ile token olusturduk.
        expiresIn: JWT_EXPIRE
    });
    return token;
};



// Pre Hooks


// Bu fonksiyon ile passwordun hashlenmesi saglandi.
UserSchema.pre("save", function (next) {

    //Parola değismemis sadece user update islemleri yapildiysa
    if(!this.isModified("password")) {
        next();
    }

    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);                                          //hata yakalama fonksiyonu kullanildi.
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);