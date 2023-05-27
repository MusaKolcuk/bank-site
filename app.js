const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");                                                           // bu modul ile dosya yollarini daha kolay bir sekilde yazabiliriz.
const connectDatabase = require("./helpers/database/connectDatabase");

const routes = require("./routes/indexRoute.js");

//Environment Variables

dotenv.config({
    path: "./config/.env"
});

//MongoDb Connection

connectDatabase();

const app = express();

//Express - Body Middleware
app.use(express.json());

const PORT = process.env.PORT;


//Routers Middlewares
app.use("/api",routes);

//Error Handler

app.use(customErrorHandler);



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})