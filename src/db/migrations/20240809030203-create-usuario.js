'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      senha: { type: Sequelize.STRING, allowNull: false },
      nome_completo: { type: Sequelize.STRING, allowNull: false },
      cpf: { type: Sequelize.STRING(11), allowNull: false, unique: true },
      data_nascimento: { type: Sequelize.DATE, allowNull: false },
      telefone: Sequelize.STRING(15),
      rua: Sequelize.STRING,
      bairro: Sequelize.STRING,
      cidade: Sequelize.STRING,
      estado: Sequelize.STRING(2),
      cep: Sequelize.STRING(8),
      sexo: Sequelize.ENUM('M', 'F', 'Outro'),
      nivel_escolaridade: Sequelize.STRING,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuario');
  }
};
