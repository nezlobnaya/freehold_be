const express = require("express");
const Property = require("../../models/property");
const User = require("../../models/user");

const bearerAuth = require("../../lib/bearer-auth");
const requireAuth = require("../../lib/require-auth");

const router = express.Router();

router.use(bearerAuth, requireAuth);

const canAddTenant = (req, res, next) => {
  // Sets the default user to an empty object to avoid `property is not a valid
  // key on undefined`
  const { user = {} } = req;

  if (user.type === "landlord") {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Only landlords are authorized to create tenants" });
  }
};

// WIP
/* eslint-disable */

// create tenant
router.post("/", canAddTenant, async (req, res) => {
  try {
    /* Start potential middleware */
    const property = await Property.getProperty(req.body.residenceId);

    if (property.landlordId !== req.user.id) {
      return res.status(401).json({
        message:
          "Not authorized to create association with another landlords property"
      });
    }

    await Property.updateProperty({ status: "occupied" }, req.body.residenceId);

    /* end potential middleware */

    const tenant = await User.createTenant({
      ...req.body,
      landlordId: req.user.id,
      type: "tenant"
    });

    if (tenant) {
      return res.status(201).json(tenant);
    } else {
      res.status(400).json({ message: "Something unexpected happened" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Something unexpected happened" });
  }
});

// get all tenants
router.get("/", async (req, res) => {
  try {
    const tenants = await User.getAllTenantsByLandlordId(req.user.id);

    if (tenants) {
      res.status(200).json(tenants);
    } else {
      res.status(500).json({ message: "Internal Server error" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Internal Server Error" });
  }
});

// get tenant by id
router.get("/:id", (req, res) => {});

// update tenant info
router.put("/:id", (req, res) => {});

/* eslint-enable */

module.exports = router;
