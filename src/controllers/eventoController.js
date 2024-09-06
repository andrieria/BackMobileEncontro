const { Evento } = require('../models');

module.exports = {
  async criar(req, res) {
    try {
      const { titulo, data_inicio, data_fim, administrador_id } = req.body;

      if (!titulo || !data_inicio || !data_fim) {
        return res.status(400).json({ error: 'Campos obrigatórios devem ser preenchidos.' });
      }

      const novoEvento = await Evento.create({
        titulo,
        data_inicio,
        data_fim,
        administrador_id
      });

      return res.status(201).json({ message: 'Evento criado com sucesso!', evento: novoEvento });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar evento.', detalhes: error.message });
    }
  },

  async listar(req, res) {
    try {
      const eventos = await Evento.findAll({
        include: [
          { model: Administrador, as: 'administrador' },
          { model: Inscricao, as: 'inscricoes' }
        ]
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar eventos.', detalhes: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, data_inicio, data_fim, administrador_id } = req.body;

      const evento = await Evento.findByPk(id);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado.' });
      }

      await evento.update({
        titulo,
        data_inicio,
        data_fim,
        administrador_id
      });

      return res.status(200).json({ message: 'Evento atualizado com sucesso!', evento });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar evento.', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const evento = await Evento.findByPk(id);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado.' });
      }

      await evento.destroy();
      return res.status(200).json({ message: 'Evento deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar evento.', detalhes: error.message });
    }
  }
};
