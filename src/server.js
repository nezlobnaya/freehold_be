const express = require("express");
const path = require('path');

const app = express();

// Base Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Routes
app.get("/hello", (_req, res) => {
  res.send("Hello, world");
});

module.exports = app;
