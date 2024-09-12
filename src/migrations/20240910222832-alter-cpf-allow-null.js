module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuario', 'cpf', {
      type: Sequelize.STRING(11),
      allowNull: true,
      unique: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuario', 'cpf', {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true
    });
  }
};
