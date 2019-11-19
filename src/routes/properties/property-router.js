const express = require('express');

const Properties = require('./property-model.js');

const router = express.Router();

//#region - CREATE 

// add Property and return results for a property by id inserted
router.post('/', async (req, res) => {
  const input = req.body;

  try {
    const results = await Properties.addProperty(input);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new property.' });
  }
});

//#endregion - CREATE

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