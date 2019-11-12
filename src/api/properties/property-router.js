const express = require('express');

const Properties = require('./property-model.js');

const router = express.Router();

//#region - READ

// GET all properties
router.get('/all', async (req, res) => {
  try {
    const results = await Properties.getAllProperties();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get results.' });
  }
});

//#endregion

module.exports = router; 