module.exports = (sequelize, DataTypes) => {
    const Administrador = sequelize.define('Administrador', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'administrador',
        timestamps: false
    });

    Administrador.associate = function (models) {
        Administrador.hasMany(models.Evento, { foreignKey: 'administrador_id' });
        Administrador.hasMany(models.Inscricao, { foreignKey: 'administrador_id' });
    };

    return Administrador;
};
