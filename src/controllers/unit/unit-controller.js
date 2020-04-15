const Unit = require('../../models/unit')

const create = async (req, res, next) => {
  try {
    const unit = await Unit.addUnit(req.body)

    res.status(200).json(unit)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const unitId = parseInt(req.params.id)
    const unit = await Unit.getUnitById(unitId)
    res.status(200).json(unit)
  } catch (err) {
    next(err)
  }
}

const getAll = async (req, res, next) => {
  try {
    const units = await Unit.getAllUnits()
    res.status(200).json(units)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const unitId = parseInt(req.params.id)
    const updatedUnit = await Unit.updateUnit(req.body, unitId)
    res.status(200).json(updatedUnit)
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
