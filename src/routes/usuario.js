const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/listar', usuarioController.listar);
router.put('/atualizar/:id', usuarioController.atualizar);
router.delete('/deletar/:id', usuarioController.deletar);

module.exports = router;
