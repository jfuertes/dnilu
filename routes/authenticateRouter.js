const express = require('express');
const bodyParser = require('body-parser');

const authenticateController = require('../controllers/authenticateController');

const authenticateRouter = express.Router();
authenticateRouter.use(bodyParser.json());

authenticateRouter.route('/login')
    .get(authenticateController.get)
    .post(authenticateController.post)
    .put(authenticateController.put)
    .delete(authenticateController.delete);

authenticateRouter.route('/checkJWTToken')
    .get(authenticateController.checkJWTToken);

module.exports = authenticateRouter;