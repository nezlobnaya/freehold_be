// const Property = require('../models/property')

// const isValidPropertyIdParam = (key = 'id') => async (req, res, next) => {
//   const propertyId = req.params[key]

//   try {
//     const property = await Property.getProperty(propertyId)

//     if (!property) {
//       return res.status(404).json({message: 'No property found with that id'})
//     }

//     next()
//   } catch (err) {
//     console.error(err)
//   }
// }

// module.exports = isValidPropertyIdParam
