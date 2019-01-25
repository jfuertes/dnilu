const express = require('express');
const bodyParser = require('body-parser');

const alertController = require('../controllers/alertController');
const authenticate = require('../authenticate');

const alertRouter = express.Router();
alertRouter.use(bodyParser.json());

alertRouter.route('/')
    .get(authenticate.verifyUser, alertController.get)
    .post(authenticate.verifyUser, alertController.post)
    .put(authenticate.verifyUser, alertController.put)
    .delete(authenticate.verifyUser, alertController.delete);

alertRouter.route('/:id')
    .get(authenticate.verifyUser, alertController.getById)
    .post(authenticate.verifyUser, alertController.postById)
    .put(authenticate.verifyUser, alertController.putById)
    .delete(authenticate.verifyUser, alertController.deleteById);

module.exports = alertRouter;