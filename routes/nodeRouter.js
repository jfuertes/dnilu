const express = require('express');
const bodyParser = require('body-parser');

const nodeController = require('../controllers/nodeController');
const authenticate = require('../authenticate');

const nodeRouter = express.Router();
nodeRouter.use(bodyParser.json());

nodeRouter.route('/')
    .get(nodeController.get)
    .post(authenticate.verifyUser, nodeController.post)
    .put(authenticate.verifyUser, nodeController.put)
    .delete(authenticate.verifyUser, nodeController.delete);

nodeRouter.route('/:id')
    .get(nodeController.getById)
    .post(authenticate.verifyUser, nodeController.postById)
    .put(authenticate.verifyUser, nodeController.putById)
    .delete(authenticate.verifyUser, nodeController.deleteById);

module.exports = nodeRouter;