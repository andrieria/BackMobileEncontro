const express = require('express');
const router = express.Router();
const AdministradorController = require('../controllers/administradorController');
const usuarioController = require('../controllers/usuarioController');
const inscricaoController = require('../controllers/inscricaoController');
const eventoController = require('../controllers/eventoController');

router.post('/usuarios/cadastrar', usuarioController.cadastrar);
router.post('/usuarios/login', usuarioController.login);
router.get('/usuarios/listar', usuarioController.listar);
router.get('/usuarios/:id', usuarioController.buscarPorId);
router.put('/usuarios/atualizar/:id', usuarioController.atualizar);
router.delete('/usuarios/deletar/:id', usuarioController.deletar);


router.post('/administradores', AdministradorController.create);
router.get('/administradores', AdministradorController.index);
router.get('/administradores/:id', AdministradorController.show);
router.put('/administradores/:id', AdministradorController.update);
router.delete('/administradores/:id', AdministradorController.delete);

router.post('/inscricoes/criar', inscricaoController.criar);
router.get('/inscricoes/listar', inscricaoController.listar);
router.put('/inscricoes/atualizar/:id', inscricaoController.atualizar);
router.put('/inscricoes/atualizar/:id/status', inscricaoController.atualizarStatus);
router.get('/inscricoes/status/usuario/:usuario_id', inscricaoController.obterStatusPorUsuario);
router.delete('/inscricoes/deletar/:id', inscricaoController.deletar);

router.post('/evento/criar', eventoController.criar);
router.get('/evento/listar', eventoController.listar);
router.put('/evento/atualizar/:id', eventoController.atualizar);
router.delete('/evento/deletar/:id', eventoController.deletar);

module.exports = router;
