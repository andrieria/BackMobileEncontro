module.exports = (sequelize, DataTypes) => {
    const Inscricao = sequelize.define('Inscricao', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        status: { type: DataTypes.ENUM('Deferido', 'Indeferido', 'Em Análise'), allowNull: false },
        usuario_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Usuario',
                key: 'id'
            }
        },
        evento_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Evento',
                key: 'id'
            }
        },
        administrador_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Administrador',
                key: 'id'
            }
        },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    }, {
        tableName: 'inscricao',
        timestamps: false
    });

    Inscricao.associate = function (models) {
        Inscricao.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
        Inscricao.belongsTo(models.Evento, { foreignKey: 'evento_id' });
        Inscricao.belongsTo(models.Administrador, { foreignKey: 'administrador_id' });
    };

    return Inscricao;
};
