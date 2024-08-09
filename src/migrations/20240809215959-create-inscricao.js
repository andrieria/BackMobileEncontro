'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inscricao', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuario',
          key: 'id'
        }
      },
      evento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'evento',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM('Deferido', 'Indeferido', 'Em Análise'),
        allowNull: false
      },
      administrador_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'administrador',
          key: 'id'
        }
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inscricao');
  }
};

