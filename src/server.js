const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const app = express();

// require router files
// const authRouter = require("./routes/auth/");
const propertyRouter = require('./routes/properties/property-router.js');

app.use(helmet());
app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Routes
// app.use("/api/auth", authRouter);
app.use('/api/properties', propertyRouter);

app.get("/hello", (_req, res) => {
  res.send("Hello, world");
});

// app.get("/protected", bearerAuth, (_req, res) => {
//   res.send("Yay");
// });

module.exports = app;