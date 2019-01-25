const express = require('express');

const machineryController = require('../controllers/machineryController');

var machineryRouter = express.Router();

machineryRouter.route('/')
    .get(machineryController.get)
    .post(machineryController.post)

machineryRouter.route('/:id')
    .get(machineryController.getById)
    .put(machineryController.putById)
    .delete(machineryController.deleteById)
    
machineryRouter.route('/:id/history')
    .get(machineryController.getHistoryById)

machineryRouter.route('/:id/history/:idsensor')
    .get(machineryController.getHistoryByIdIdsensor)

machineryRouter.route('/:id/actual/:idsensor')
    .get(machineryController.getActualByIdIdsensor)

module.exports = machineryRouter;
