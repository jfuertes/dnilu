const express = require('express');
const bodyParser = require('body-parser');

const hostController = require('../controllers/hostController');
const authenticate = require('../authenticate');

const hostRouter = express.Router();
hostRouter.use(bodyParser.json());

hostRouter.route('/')
    .get(authenticate.verifyUser, hostController.get)
    .post(authenticate.verifyUser, hostController.post)
    .put(authenticate.verifyUser, hostController.put)
    .delete(authenticate.verifyUser, hostController.delete);

hostRouter.route('/:id')
    .get(authenticate.verifyUser, hostController.getById)
    .post(authenticate.verifyUser, hostController.postById)
    .put(authenticate.verifyUser, hostController.putById)
    .delete(authenticate.verifyUser, hostController.deleteById);

module.exports = hostRouter;