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

  async pendentes(req, res) {
    try {
      const inscricoes = await Inscricao.findAll({
        where: { status: 'Em Análise' },
        include: [
          { model: Usuario, as: 'usuario' },
          { model: Evento, as: 'evento' },
        ],
      });
      return res.status(200).json(inscricoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar inscrições.', detalhes: error.message });
    }
  },  

  async pendentesporid(req, res) {
    try {
      const { id } = req.params;
      const inscricao = await Inscricao.findOne({
        where: { id, status: 'Em Análise' },
        include: [
          { model: Usuario, as: 'usuario' },
          { model: Evento, as: 'evento' },
        ],
      });
      if (!inscricao) {
        return res.status(404).json({ error: 'Inscrição não encontrada.' });
      }
      return res.status(200).json(inscricao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar inscrição.', detalhes: error.message });
    }
  },  

  async pendentesPorUsuarioId(req, res) {
    try {
      const { id } = req.params;
  
      // Buscar inscrições por ID de usuário e incluir os dados do usuário e evento (se houver)
      const inscricoes = await Inscricao.findAll({
        where: { usuario_id: id },
        include: [
          { model: Usuario, as: 'usuario', attributes: ['id', 'nome_completo', 'email', 'cpf'] }
        ],
      });
  
      if (!inscricoes || inscricoes.length === 0) {
        return res.status(404).json({ error: 'Inscrição não encontrada.' });
      }
  
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
// Atualiza o status da inscrição de um usuário
  async atualizarStatusInscricao(req, res) {
    try {
      const { id } = req.params; // ID da inscrição
      const { status } = req.body; // Novo status (Deferido ou Indeferido)

      if (!['Deferido', 'Indeferido'].includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
      }

      const inscricao = await Inscricao.findByPk(id);

    if (!inscricao) {
      return res.status(404).json({ error: 'Inscrição não encontrada' });
    }

    inscricao.status = status;
    await inscricao.save();

    return res.status(200).json({ message: 'Status atualizado com sucesso', inscricao });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar status', detalhes: error.message });
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