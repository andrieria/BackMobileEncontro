module.exports = (sequelize, DataTypes) => {
    const Inscricao = sequelize.define('Inscricao', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        usuario_id: {type: DataTypes.INTEGER, references: {model: 'usuario', key: 'id'}, onUpdate: 'CASCADE', onDelete: 'SET NULL'},
        evento_id: {type: DataTypes.INTEGER, references: {model: 'evento', key: 'id'}, onUpdate: 'CASCADE',onDelete: 'SET NULL'},
        status: {type: DataTypes.ENUM('Deferido', 'Indeferido', 'Em Análise'),allowNull: false},
        administrador_id: {type: DataTypes.INTEGER,references: {model: 'administrador',key: 'id'}, onUpdate: 'CASCADE', onDelete: 'SET NULL'},
        created_at: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW},
        updated_at: { type: DataTypes.DATE,allowNull: false, defaultValue: DataTypes.NOW}
    },
    {
        tableName: 'inscricao'
    });

    Inscricao.associate = function(models) {
        Inscricao.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
        Inscricao.belongsTo(models.Evento, { foreignKey: 'evento_id' });
        Inscricao.belongsTo(models.Administrador, { foreignKey: 'administrador_id' });
    }

    return Inscricao;
}   