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

// const readAllByUser = async (req, res) => {
//   try {
//     if (req.user.type === 'tenant') {
//       const workOrders = await Workorders.getAllByPropertyId(
//         req.user.residenceId,
//       )

//       res.status(200).json(workOrders)
//     } else {
//       const workOrders = await Workorders.getByLandlordId(req.user.id)
//       res.status(200).json(workOrders)
//     }
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({error: 'Internal server error'})
//   }
// }

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
    const updateResults = await WorkOrders.update(changes, id)

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
  readById,
  updateById,
}
