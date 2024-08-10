const express = require('express');
const router = express.Router();

// Importando rotas de usuários
const usuarioRoutes = require('./usuario');

// Definindo a rota base para usuários
router.use('/usuario', usuarioRoutes);

module.exports = router;
