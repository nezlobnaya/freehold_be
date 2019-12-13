const Property = require("../models/property");

const isValidPropertyId = async (req, res, next) => {
  const { propertyId } = req.body;

  try {
    const property = await Property.getProperty(propertyId);

    if (!property) {
      return res
        .status(404)
        .json({ message: "No property found with that id" });
    }

    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = isValidPropertyId;
