const Property = require('../models/unit/unit-model')

const ifNoPropertyNext = async (req, res, next) => {
    try {
      const {street_address} = req.body
      const property = await Property.getUnitByAddress(street_address)
  
      if (!property) {
        next()
      } else {
        res.status(403).json({message: 'property already exists'})
      }
  
    } catch (err) {
      next(err)  
    }
  }

  module.exports = ifNoPropertyNext