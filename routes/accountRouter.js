const express = require('express');

const accountController = require('../controllers/accountController');

var accountRouter = express.Router();

accountRouter.route('/')
    .get(accountController.get)
    .post(accountController.post)

accountRouter.route('/:id')
    .get(accountController.getById)
    .put(accountController.putById)
    .delete(accountController.deleteById)

accountRouter.route('/user/:userId')
    .get(accountController.getByUserId)
    .put(accountController.putByUserId)
    
module.exports = accountRouter;
