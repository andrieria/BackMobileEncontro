const { Usuario }  = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async cadastrar(req, res) {
        try {
          const { email, senha, confirmarSenha } = req.body;
    
          if (senha !== confirmarSenha) {
            return res.status(400).json({ error: 'As senhas não coincidem.' });
          }
    
          const usuarioExistente = await Usuario.findOne({ where: { email } });
          if (usuarioExistente) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
          }
    
          const hashedSenha = await bcrypt.hash(senha, 10);
          const novoUsuario = await Usuario.create({ email, senha: hashedSenha });
    
          return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
        } catch (error) {
          return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }
      },

    async login(req, res) {
        try {
          const { email, senha } = req.body;
          const usuario = await Usuario.findOne({ where: { email } });
    
          if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
          }
    
          const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.status(200).json({ token });
        } catch (error) {
          return res.status(500).json({ error: 'Erro ao realizar login.' });
        }
      }

}