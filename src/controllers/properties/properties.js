const Property = require("../../models/property");

const create = async (req, res) => {
  const input = req.body;

  try {
    const property = await Property.addProperty(input, req.user.id);
    if (property) {
      res.status(201).json(property);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllByUser = async (req, res) => {
  try {
    const properties = await Property.getPropertiesByUser(req.user.id);

    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.getProperty(id);

    if (property) {
      if (!req.user.id === property.landlordId) {
        res.sendStatus(401);
        return;
      }

      res.status(200).json(property);
    } else {
      res.status(404).json({ error: "No property found with that id" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const results = await Property.updateProperty(changes, id);

    if (results.updated) {
      res.status(200).json(results.property);
    } else {
      res.status(404).json({ message: "No property found with that id" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  create,
  getAllByUser,
  getById,
  updateById
};
