const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const authenticateController = require('../controllers/authenticateController');

const authenticateRouter = express.Router();
authenticateRouter.use(bodyParser.json());

authenticateRouter.route('/')
    .get(authenticateController.get)
    .post(passport.authenticate('local'), authenticateController.post)
    .put(authenticateController.put)
    .delete(authenticateController.delete);

module.exports = authenticateRouter;