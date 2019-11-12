const express = require("express");
const path = require('path');

const app = express();

// require router files
const propertyRouter = require('./api/properties/property-router.js');

// Base Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Routes
app.get("/hello", (_req, res) => {
  res.send("Hello, world");
});
app.use('/api/properties', propertyRouter);

module.exports = app;
