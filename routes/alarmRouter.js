const express = require('express');

const alarmController = require('../controllers/alarmController');
const authenticate = require('../authenticate');

const alarmRouter = express.Router();

alarmRouter.route('/')
    .get(authenticate.verifyUser, alarmController.get)
    .post(authenticate.verifyUser, alarmController.post)
    .put(authenticate.verifyUser, alarmController.put)
    .delete(authenticate.verifyUser, alarmController.delete);

module.exports = alarmRouter;