const express = require("express");
const Users = require("../../controllers/users/");

const bearerAuth = require("../../lib/bearer-auth");
const requireAuth = require("../../lib/require-auth");

const router = express.Router();

router.get("/me", bearerAuth, requireAuth, Users.getCurrent);

router.put("/me", bearerAuth, requireAuth, Users.updateCurrent);

module.exports = router;
