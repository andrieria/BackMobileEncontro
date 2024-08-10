const { Usuario } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async cadastrar(req, res) {
    try {
      const { email, senha, confirmarSenha } = req.body;

      if (!email || !senha || !confirmarSenha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

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

      if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { email, senha } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const hashedSenha = senha ? await bcrypt.hash(senha, 10) : usuario.senha;
      await usuario.update({ email, senha: hashedSenha });

      return res.status(200).json({ message: 'Usuário atualizado com sucesso!', usuario });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await usuario.destroy();
      return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  }
}
