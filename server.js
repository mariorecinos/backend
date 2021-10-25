//Dependencies
// get .env variables
require("dotenv").config();
// pull PORT from .env
const { DATABASE_URL, PORT } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
//import Controller
const peopleController = require('./controller/people');
// import middleware
const cors = require("cors");
const morgan = require("morgan");

//Database Connection
// Establish Connection
mongoose.connect(DATABASE_URL);
// shortcup variable for connection information object
const db = mongoose.connection;
// Connection Events
db.on('connected', () => {
  console.log(`Connected to MongoDB on port:${db.port}`);
});

db.on('disconnected', () => {
  console.log(`Disconnected from MongoDB`);
});

db.on('error', (error) => {
  console.log(`A MongoDB Error has occurred: ${error.message}`);
});

//mount Middleware
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

// mount Routes
app.use('/people', peopleController);

// Mount Routes
//create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});


// Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
