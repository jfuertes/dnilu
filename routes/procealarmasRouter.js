const express = require('express');
const bodyParser = require('body-parser');

const procealarmasController = require('../controllers/procealarmasController');

const procealarmasRouter = express.Router();
procealarmasRouter.use(bodyParser.json());


procealarmasRouter.route('/')
    .get(procealarmasController.get)
    .post(procealarmasController.post)


module.exports = procealarmasRouter;