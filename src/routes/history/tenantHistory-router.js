const express = require('express')
const History = require('./tenantHistory-model.js')

const {
  isValidTenantId,
  isValidTenantIdParam,
  isValidPropertyId,
  isValidPropertyIdParam,
  validateTenantHistoryInput,
} = require('../../middleware')

const router = express.Router()

//#region - CREATE

// add a new entry for tenant history, returns entry added
router.post(
  '/',
  validateTenantHistoryInput,
  isValidPropertyId('propertyId'),
  isValidTenantId,
  async (req, res) => {
    const input = req.input

    try {
      const results = await History.create(input)
      res.status(201).json(results)
    } catch (err) {
      console.error(err)
      res.status(500).json({message: 'Failed to create new entry.'})
    }
  },
)

//#endregion - CREATE

//#region - READ

// GET history by id
router.get('/:id', async (req, res) => {
  const {id} = req.params

  try {
    const results = await History.getById(id)

    if (results) {
      res.status(200).json(results)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({message: 'Failed to get results for given id.'})
  }
})

// GET history by property id
router.get('/property/:id', isValidPropertyIdParam(), async (req, res) => {
  const {id} = req.params

  try {
    const results = await History.getByPropertyId(id)

    if (results) {
      res.status(200).json(results)
    } else {
      res.json(results)
    }
  } catch (err) {
    res
      .status(500)
      .json({message: 'Failed to get results for given property id.'})
  }
})

// GET history by tenant id
router.get('/tenant/:id', isValidTenantIdParam('id'), async (req, res) => {
  const {id} = req.params

  try {
    const results = await History.getByTenantId(id)

    res.status(200).json(results)
  } catch (err) {
    res
      .status(500)
      .json({message: 'Failed to get results for given tenant id.'})
  }
})

//#endregion

//#region - UPDATE

// Update history, returns updated entry
router.put('/:id', async (req, res) => {
  const {id} = req.params
  const changes = req.body

  // Possibly extract into middleware
  if (Object.keys(changes).length <= 0) {
    return res.status(400).json({message: 'Request body must not be empty'})
  }

  try {
    const results = await History.updateById(changes, id)

    if (results) {
      res.json(results)
    } else {
      res.status(404).json({message: 'Could not find entry with given id.'})
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({message: 'Failed to update the entry.'})
  }
})

//#endregion

//#region - DELETE

// delete tenant history entry, returns entry that was deleted
router.delete('/:id', async (req, res) => {
  const {id} = req.params

  try {
    // check that property exists
    const {deleted, tenantHistory} = await History.deleteById(id)

    // check that delete returns
    if (deleted) {
      res.status(200).json(tenantHistory) // return the entry to be deleted.
    } else {
      res.status(404).json({message: 'Could not find entry with given id.'})
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({message: 'Failed to delete entry.'})
  }
})

//#endregion

module.exports = router
