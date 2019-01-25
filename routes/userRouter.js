const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/userController');

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.route('/')
    .get(userController.get)
    .post(userController.post)

userRouter.route('/:id')
    .get(userController.getById)
    .delete(userController.deleteById)
    .put(userController.putById)
    
userRouter.route('/account')
    .post(userController.postWithAccount)

userRouter.route('/:id/account')
    .get(userController.getAccountById)

userRouter.route('/:id/machineries')
    .get(userController.getMachineriesById)

module.exports = userRouter;