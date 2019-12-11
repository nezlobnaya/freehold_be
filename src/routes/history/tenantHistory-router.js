const express = require('express');
const History = require('./tenantHistory-model.js');
const parseDate = require('../../lib/parseDate.js');
const router = express.Router();

//#region - CREATE 

// add a new entry for tenant history, returns entry added
router.post('/', async (req, res) => {
  const input = req.body;

  try {
    const results = await History.addTenantHistory(input);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new entry.' });
  }
});

//#endregion - CREATE

//#region - READ

// GET history by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const results = await History.getHistoryById(id);

    // change date to a readable string
    results.historyRawStartdate = results.historyStartdate
    results.historyRawEnddate = results.historyEnddate
    results.historyStartdate = parseDate.simple(results.historyStartdate)
    results.historyEnddate = parseDate.simple(results.historyEnddate)

    res.json(results);

  } catch (err) {
    res.status(500).json({ message: 'Failed to get results for given id.' });
  }
});

// GET history by property id
router.get('/property/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const rawResults = await History.getHistoryByProperty(id);

    // map thru raw results to change date to a readable string
    const results = rawResults.map( x => {
      x.historyRawStartdate = x.historyStartdate
      x.historyStartdate = parseDate.simple(x.historyStartdate)
      x.historyEnddate = parseDate.simple(x.historyEnddate)
      return x
    })

    res.json(results);

  } catch (err) {
    res.status(500).json({ message: 'Failed to get results for given property id.' });
  }
});

// GET history by tenant id
router.get('/tenant/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const rawResults = await History.getHistoryByTenant(id);

    // map thru raw results to change date to a readable string
    const results = rawResults.map( x => {
      x.historyRawStartdate = x.historyStartdate
      x.historyStartdate = parseDate.simple(x.historyStartdate)
      x.historyEnddate = parseDate.simple(x.historyEnddate)
      return x
    })
    
    res.json(results);

  } catch (err) {
    res.status(500).json({ message: 'Failed to get results for given tenant id.' });
  }
});

//#endregion

//#region - UPDATE

// Update history, returns updated entry
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const results = await History.updateHistory(changes, id);
    if (results) {
      res.json(results);
    } else {
      res.status(404).json({ message: 'Could not find entry with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update the entry.' });
  }
});

//#endregion  

//#region - DELETE

// delete tenant history entry, returns entry that was deleted
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const entryToDelete = await History.getHistoryById(id);

    // check that property exists
    if (entryToDelete) {
      const results = await History.deleteHistory(id);

      // check that delete returns
      if (results) {
        res.json(entryToDelete); // return the entry to be deleted.
      } else {
        res.status(404).json({ message: 'Could not delete entry.' });
      }
    } else {
      res.status(404).json({ message: 'Could not find entry with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete entry.' });
  }
});

//#endregion 

module.exports = router; 