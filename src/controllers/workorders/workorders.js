// Workorder Controllers
const Workorders = require('../../models/workorders')
//const User = require('../../models/user')

const create = async (req, res) => {
  const input = req.body

  try {
    const results = await Workorders.add(input, req.property.id, req.user.id)
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

const readAllByUser = async (req, res) => {
  try {
    const createdBy = req.user.id
    const results = await Workorders.getBy({"createdBy": createdBy})

    res.status(200).json(results)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Internal server error'})
  }
}

const readById = async (req, res) => {
  // const {id} = req.params

  // try {
  //   const property = await Property.getProperty(id)

  //   if (property) {
  //     if (!req.user.id === property.landlordId) {
  //       res.sendStatus(401)
  //       return
  //     }

  //     res.status(200).json(property)
  //   } else {
  //     res.status(404).json({error: 'No property found with that id'})
  //   }
  // } catch (err) {
  //   console.error(err)
  //   res.status(500).json({error: 'Internal server error'})
  // }
}

const updateById = async (req, res) => {
  const {id} = req.params
  const changes = req.body

  try {
    const updateResults = await Workorders.update(changes, id)

    if (updateResults.updated) {
      res.status(200).json(updateResults.results)
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
  readAllByUser,
  readById,
  updateById,
}
