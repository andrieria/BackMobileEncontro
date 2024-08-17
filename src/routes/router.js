const express = require('express');
const router = express.Router();
const AdministradorController = require('../controllers/administradorController');
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/listar', usuarioController.listar);
router.put('/atualizar/:id', usuarioController.atualizar);
router.delete('/deletar/:id', usuarioController.deletar);

router.post('/administradores', AdministradorController.create);
router.get('/administradores', AdministradorController.index);
router.get('/administradores/:id', AdministradorController.show);
router.put('/administradores/:id', AdministradorController.update);
router.delete('/administradores/:id', AdministradorController.delete);

module.exports = router;
