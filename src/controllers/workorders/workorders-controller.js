// Workorder Controllers
const WorkOrders = require('../../models/workorders/workorders-model')

const create = async (req, res) => {
  const input = req.body

  try {
    const results = await WorkOrders.add(input)
    if (results) {
      res.status(201).json(results)
    } else {
      res.sendStatus(400)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Internal server error'})
  }
}

const readById = async (req, res) => {
  const {id} = req.params

  try {
    const results = await WorkOrders.getById(id)

    if (results) {
      res.status(200).json(results)
    } else {
      res.status(404).json({error: 'No workorder found with that id'})
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Internal server error'})
  }
}

const updateById = async (req, res) => {
  const {id} = req.params
  const changes = req.body

  try {
    const updateResults = await WorkOrders.update(changes, id)

    if (updateResults) {
      res.status(200).json(updateResults)
    } else {
      res.status(404).json({message: 'No workorder found with that id'})
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Internal server error'})
  }
}

module.exports = {
  create,
  readById,
  updateById,
}
