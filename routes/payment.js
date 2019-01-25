var express = require('express');
var router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rutas de Usuarios
router.post('/', paymentController.Paymentpost);
router.get('/', paymentController.Paymentget);


router.get('/:id', paymentController.PaymentIdget);
router.delete('/:id', paymentController.PaymentIddelete);
router.put('/:id', paymentController.PaymentIdput);

module.exports = router;