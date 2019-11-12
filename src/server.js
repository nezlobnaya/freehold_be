const express = require("express");
const authRouter = require("./routes/auth/");
const bearerAuth = require("./lib/bearer-auth");
const path = require('path');

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);



app.get("/hello", (_req, res) => {
  res.send("Hello, world");
});

app.get("/protected", bearerAuth, (_req, res) => {
  res.send("Yay");
});

// Base Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

module.exports = app;
