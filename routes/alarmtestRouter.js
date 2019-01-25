const express = require('express');
const bodyParser = require('body-parser');

const alarmtestController = require('../controllers/alarmtestController');
const authenticate = require('../authenticate');

const alarmtestRouter = express.Router();
alarmtestRouter.use(bodyParser.json());

alarmtestRouter.route('/')
    .get(authenticate.verifyUser, alarmtestController.get)
    .post(authenticate.verifyUser, alarmtestController.post)
    .put(authenticate.verifyUser, alarmtestController.put)
    .delete(authenticate.verifyUser, alarmtestController.delete);



module.exports = alarmtestRouter;