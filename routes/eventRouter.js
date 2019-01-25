const express = require('express');
const bodyParser = require('body-parser');

const eventController = require('../controllers/eventController');
const authenticate = require('../authenticate');

const eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.route('/')
    .get(authenticate.verifyUser, eventController.get)
    .post(authenticate.verifyUser, eventController.post)
    .put(authenticate.verifyUser, eventController.put)
    .delete(authenticate.verifyUser, eventController.delete);

eventRouter.route('/:id')
    .get(authenticate.verifyUser, eventController.getById)
    .post(authenticate.verifyUser, eventController.postById)
    .put(authenticate.verifyUser, eventController.putById)
    .delete(authenticate.verifyUser, eventController.deleteById);

eventRouter.route('/host/:hostId')
    .get(authenticate.verifyUser, eventController.getByHostId)
    .post(authenticate.verifyUser, eventController.postByHostId)
    .put(authenticate.verifyUser, eventController.putByHostId)
    .delete(authenticate.verifyUser, eventController.deleteByHostId);

module.exports = eventRouter;