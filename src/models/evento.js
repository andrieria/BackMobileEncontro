module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define('Evento', {
        id: { type: DataTypes.INTEGER, primarykey: true, autoIncrement: true },
        titulo: { type: DataTypes.STRING, allowNull: false },
        data_inicio: { type: DataTypes.DATE, allowNull: false },
        data_fim: { type: DataTypes.DATE, allowNull: false },
        administrador_id: {
            type: DataTypes.INTEGER,
            references: { model: 'Administrador', key: 'id' }
        }
    }, {
        tableName: 'evento'
    });
}