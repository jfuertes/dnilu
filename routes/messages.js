var express = require('express');
var router = express.Router();
const messagesController = require('../controllers/messagesController');

// Rutas de Usuarios
router.post('/', messagesController.Messagespost);
router.get('/', messagesController.Messagesget);


router.get('/:id', messagesController.MessagesIdget);
router.delete('/:id', messagesController.MessagesIddelete);
router.put('/:id', messagesController.MessagesIdput);

module.exports = router;