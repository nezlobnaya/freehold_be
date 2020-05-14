// Workorder Controllers
const WorkOrders = require('../../models/workorders/workorders-model')

const create = async (req, res, next) => {
  const input = req.body

  try {
    const results = await WorkOrders.add(input)
    if (results) {
      res.status(201).json(results)
    } else {
      res.sendStatus(400)
    }
  } catch (err) {
    next(err)
  }
}

const readAllByUser = async (req, res, next) => {
  const {decodedToken} = req
  try {
    const workOrders = await WorkOrders.getAll(decodedToken)
    res.status(200).json(workOrders)
  } catch (err) {
    next(err)
  }
}

const readById = async (req, res, next) => {
  const {id} = req.params

  try {
    const results = await WorkOrders.getById(id)

    if (results) {
      res.status(200).json(results)
    } else {
      res.status(404).json({error: 'No workorder found with that id'})
    }
  } catch (err) {
    next(err)
  }
}

const updateById = async (req, res, next) => {
  const {id} = req.params
  const changes = req.body

  try {
    const updateResults = await WorkOrders.update(id, changes)

    if (updateResults) {
      res.status(200).json(updateResults)
    } else {
      res.status(404).json({message: 'No workorder found with that id'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  readAllByUser,
  readById,
  updateById,
}
