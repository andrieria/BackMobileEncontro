module.exports = (sequelize, DataTypes) => {
    const Administrador = sequelize.define('Administrador', {
        id: { type: DataTypes.INTEGER, primarykey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    }, {
        tableName: 'administrador'
    });

    Administrador.associate = function(models) {
        Administrador.hasMany(models.Evento, { foreignKey: 'administrador_id' });
        Administrador.hasMany(models.Inscricao, { foreignKey: 'administrador_id' });
    }

    return Administrador;
}