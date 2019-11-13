const express = require("express");
const validateAuthInput = require("../../lib/validate-auth-input");
const router = express.Router();

const { createUser, login } = require("../../controllers/auth/");

router.post("/register", validateAuthInput, createUser);

router.post("/login", validateAuthInput, login);

module.exports = router;
