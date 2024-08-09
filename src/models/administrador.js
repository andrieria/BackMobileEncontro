module.exports = (sequelize, DataTypes) => {
    const Administrador = sequelize.define('Administrador', {
        id: { type: DataTypes.INTEGER, primarykey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha: { type: DataTypes.STRING, allowNull: false },
    }, {
        tableName: 'administrador'
    });
}