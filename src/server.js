const express = require("express");
const authRouter = require("./routes/auth/");
const bearerAuth = require("./lib/bearer-auth");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.get("/hello", (_req, res) => {
  res.send("Hello, world");
});

app.get("/protected", bearerAuth, (_req, res) => {
  res.send("Yay");
});

module.exports = app;
