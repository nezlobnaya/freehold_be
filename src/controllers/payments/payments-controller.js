const PaymentsModel = require('../../models/payments/payments-model')

const create = async (req, res, next) => {
  try {
    const payment = await PaymentsModel.add(req.body)
    res.status(200).json(payment)
  } catch (err) {
    next(err)
  }
}

const getPayment = async (req, res, next) => {
  try {
    const payment = await PaymentsModel.getById(req.params.id)

    if (!payment) {
      res.status(404).json({message: 'payment not found'})
    } else {
      res.status(200).json(payment)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  getPayment,
}
