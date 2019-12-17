const express = require("express");
const cors = require("cors")({ origin: true });
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRouter = require("./routes/auth/");
const propertyRouter = require("./routes/properties/property-router.js");
const tenantHistoryRouter = require("./routes/history/tenantHistory-router.js");
const tenantsRouter = require("./routes/tenants");

const bearerAuth = require("./lib/bearer-auth");
const requireAuth = require("./lib/require-auth");

const app = express();

app.use(cors);
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

// require router files

app.use("/api/auth", authRouter);

// Base Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/history", tenantHistoryRouter);

app.use("/api/tenants", tenantsRouter);

app.get("/hello", (_req, res) => {
  res.send("Hello, world");
});

app.get("/protected", bearerAuth, requireAuth, (req, res) => {
  res.send(`Yay! your email is ${req.user}`);
});

module.exports = app;
