// Bu sayfada tüm route dosyalarını tek bir dosyada toplayacağız. Bu sayede app.js dosyasında tek bir dosyayı import ederek tüm route dosyalarını kullanabileceğiz.

const express = require('express');

const auth = require('./authRoute');
const user = require('./userRoute');

const router = express.Router();

router.use("/auth", auth);
router.use("/users", user);



module.exports = router;

