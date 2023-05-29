const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");
const connectDatabase = require("./helpers/database/connectDatabase");
const http = require('http');
const fs = require('fs');
const cors = require('cors');

// Routers
const indexRoute = require("./routes/indexRoute.js");

// Environment Variables
dotenv.config({
  path: "./config/.env"
});

// MongoDb Connection
connectDatabase();

const app = express();

// CORS
app.use(cors());

const server = http.createServer(app);

// Express - Body Middleware
app.use(express.json());

const PORT = process.env.PORT;

// Routers Middlewares
app.use("/api", indexRoute);

// Error Handler
app.use(customErrorHandler);

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html file
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal server error');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
