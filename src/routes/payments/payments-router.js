const express = require('express')
const PaymentsController = require('../../controllers/payments/payments-controller')

const router = express.Router()

router.post('/', PaymentsController.create)
router.get('/:id', PaymentsController.getPayment)
// router.put('/:id', PaymentsController.update)
// router.delete('/:id', PaymentsController.deleteMedia)

module.exports = router
