const express = require('express');

const Properties = require('./property-model.js');

const router = express.Router();

//#region - READ

// GET all properties
router.get('/', async (req, res) => {
  try {
    const results = await Properties.getAllProperties();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get results.' });
  }
});

// GET property by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const results = await Properties.getProperty(id);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get results.' });
  }
});

// GET all properties for a specific user
router.get('/', async (req, res) => {
  try {
    const results = await Properties.getAllProperties();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get results.' });
  }
});

// GET all properties for a specific user
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const results = await Properties.getPropertiesByUser(email);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get results.' });
  }
});

//#endregion 

module.exports = router; 