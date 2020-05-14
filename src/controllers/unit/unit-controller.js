const Unit = require('../../models/unit')

const create = async (req, res, next) => {
  const {decodedToken} = req
  try {
    const {name, street_address, city, state, zip, occupied, rent} = req.body
    const unitData = {
      name,
      street_address,
      city,
      state,
      zip,
      occupied,
      rent,
    }
    const unit = await Unit.addUnit(unitData, decodedToken)

    res.status(201).json(unit)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const unitId = parseInt(req.params.id)
    const unit = await Unit.getUnitById(unitId)

    if (!unit) {
      res.status(404).json({message: 'unit not found'})
    } else {
      res.status(200).json(unit)
    }
  } catch (err) {
    next(err)
  }
}

const getAll = async (req, res, next) => {
  const {decodedToken} = req
  try {
    const units = await Unit.getAllUnits(decodedToken)
    res.status(200).json(units.rows)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const unitId = parseInt(req.params.id)
    const updatedUnit = await Unit.updateUnit(req.body, unitId)

    if (!updatedUnit) {
      res.status(404).json({message: 'unit not found'})
    } else {
      res.status(200).json(updatedUnit)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  getById,
  getAll,
  update,
}
