'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evento', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      titulo: { type: Sequelize.STRING, allowNull: false },
      data_inicio: { type: Sequelize.DATE, allowNull: false },
      data_fim: { type: Sequelize.DATE, allowNull: false },
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
    await queryInterface.dropTable('evento');
  }
};
