const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async cadastrar(req, res) {
    try {
      const { email, senha, confirmarSenha } = req.body;

      if (!email || !senha || !confirmarSenha) {
          return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      if (senha !== confirmarSenha) {
          return res.status(400).json({ error: 'As senhas não coincidem.' });
      }

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
          return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      const hashedSenha = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        email,
        senha: hashedSenha,
        cpf: null // Assegura que o campo CPF será null
    });

      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário.', detalhes: error.message });
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
      return res.status(200).json({ token, userId: usuario.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  },

  async listar(req, res) {
    try {
      console.log('Requisito para listar usuários recebido');
      const usuarios = await Usuario.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
  },  

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  },

  async atualizar(req, res) {
    try {
      console.log('Requisição recebida:', req.params, req.body);
      const { id } = req.params;
      const {
        nome_completo,
        cpf,
        data_nascimento,
        telefone,
        rua,
        bairro,
        cidade,
        estado,
        cep,
        sexo,
        nivel_escolaridade,
        email,
        senha
      } = req.body;
  
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      console.log('Usuário encontrado:', usuario);
      const hashedSenha = senha ? await bcrypt.hash(senha, 10) : usuario.senha;
      await usuario.update({
        nome_completo,
        cpf,
        data_nascimento,
        telefone,
        rua,
        bairro,
        cidade,
        estado,
        cep,
        sexo,
        nivel_escolaridade,
        email,
        senha: hashedSenha
      });
      console.log('Usuário atualizado com sucesso');
      return res.status(200).json({ message: 'Usuário atualizado com sucesso!', usuario });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
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