const express = require('express');
const router = express.Router();
const AdministradorController = require('../controllers/administradorController');

router.post('/administradores', AdministradorController.create);
router.get('/administradores', AdministradorController.index);
router.get('/administradores/:id', AdministradorController.show);
router.put('/administradores/:id', AdministradorController.update);
router.delete('/administradores/:id', AdministradorController.delete);

module.exports = router;
