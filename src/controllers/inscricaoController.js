const { Inscricao, Usuario, Evento, Administrador } = require('../models');

module.exports = {
  async criar(req, res) {
    try {
      const { usuario_id, evento_id, status, administrador_id } = req.body;

      if (!usuario_id || !evento_id || !status) {
        return res.status(400).json({ error: 'Campos obrigatórios devem ser preenchidos.' });
      }
      const novaInscricao = await Inscricao.create({
        usuario_id,
        evento_id,
        status,
        administrador_id,
      });

      return res.status(201).json({ message: 'Inscrição criada com sucesso!', inscricao: novaInscricao });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar inscrição.', detalhes: error.message });
    }
  },

  async listar(req, res) {
    try {
      const inscricoes = await Inscricao.findAll({
        include: [
          { model: Usuario, as: 'usuario' },
          { model: Evento, as: 'evento' },
          { model: Administrador, as: 'administrador' },
        ],
      });
      return res.status(200).json(inscricoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar inscrições.', detalhes: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { usuario_id, evento_id, status, administrador_id } = req.body;

      const inscricao = await Inscricao.findByPk(id);
      if (!inscricao) {
        return res.status(404).json({ error: 'Inscrição não encontrada.' });
      }

      await inscricao.update({
        usuario_id,
        evento_id,
        status,
        administrador_id,
      });

      return res.status(200).json({ message: 'Inscrição atualizada com sucesso!', inscricao });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar inscrição.', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const inscricao = await Inscricao.findByPk(id);
      if (!inscricao) {
        return res.status(404).json({ error: 'Inscrição não encontrada.' });
      }

      await inscricao.destroy();
      return res.status(200).json({ message: 'Inscrição deletada com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar inscrição.', detalhes: error.message });
    }
  },

  // Novo método para atualizar o status da inscrição
  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body; // Novo status a ser definido

      const inscricao = await Inscricao.findByPk(id);
      if (!inscricao) {
        return res.status(404).json({ error: 'Inscrição não encontrada.' });
      }

      await inscricao.update({ status }); // Atualiza somente o status
      return res.status(200).json({ message: 'Status atualizado com sucesso!', inscricao });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar status da inscrição.', detalhes: error.message });
    }
  },

  // Novo método para obter o status da inscrição de um usuário específico
  async obterStatusPorUsuario(req, res) {
    try {
      const { usuario_id } = req.params;

      const inscricao = await Inscricao.findOne({ where: { usuario_id } });

      if (!inscricao) {
        return res.status(404).json({ message: 'Inscrição não encontrada para este usuário.' });
      }

      return res.status(200).json({ status: inscricao.status });
    } catch (error) {
      console.error('Erro ao obter status da inscrição:', error);
      return res.status(500).json({ error: 'Erro ao obter status da inscrição.', detalhes: error.message });
    }
  },
};