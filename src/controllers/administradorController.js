const { Administrador } = require('../models'); // Assumindo que seus models estão na pasta models
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

module.exports = {
  // Cria um novo administrador
  async create(req, res) {
    try {
        const { email, senha } = req.body;

        // Verifica se já existe um administrador com o mesmo email
        const adminExistente = await Administrador.findOne({ where: { email } });
        if (adminExistente) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        // Criptografa a senha antes de salvar
        const senhaHash = await bcrypt.hash(senha, 10);

        const administrador = await Administrador.create({
            email,
            senha: senhaHash
        });

        return res.status(201).json(administrador);
    } catch (error) {
        console.error('Erro ao criar administrador:', error); // Log do erro
        return res.status(500).json({ error: 'Erro ao criar administrador.' });
    }
},

  // Lista todos os administradores
  async index(req, res) {
    try {
      const administradores = await Administrador.findAll();
      return res.status(200).json(administradores);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar administradores.' });
    }
  },

  // Exibe um administrador específico
  async show(req, res) {
    try {
      const { id } = req.params;
      const administrador = await Administrador.findByPk(id);

      if (!administrador) {
        return res.status(404).json({ error: 'Administrador não encontrado.' });
      }

      return res.status(200).json(administrador);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar administrador.' });
    }
  },

  // Atualiza um administrador específico
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, senha } = req.body;

      const administrador = await Administrador.findByPk(id);

      if (!administrador) {
        return res.status(404).json({ error: 'Administrador não encontrado.' });
      }

      const senhaHash = senha ? await bcrypt.hash(senha, 10) : administrador.senha;

      await administrador.update({
        email: email || administrador.email,
        senha: senhaHash
      });

      return res.status(200).json(administrador);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar administrador.' });
    }
  },

  // Deleta um administrador específico
  async delete(req, res) {
    try {
      const { id } = req.params;
      const administrador = await Administrador.findByPk(id);

      if (!Administrador) {
        return res.status(404).json({ error: 'Administrador não encontrado.' });
      }

      await administrador.destroy();
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar administrador.' });
    }
  }
};
