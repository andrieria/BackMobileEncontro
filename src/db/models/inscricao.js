module.exports = (sequelize, DataTypes) => {
    const Inscricao = sequelize.define('Inscricao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            references: { model: 'usuario', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        evento_id: {
            type: DataTypes.INTEGER,
            references: { model: 'evento', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        status: {
            type: DataTypes.ENUM('Deferido', 'Indeferido', 'Em Análise'),
            allowNull: false
        },
        administrador_id: {
            type: DataTypes.INTEGER,
            references: { model: 'administrador', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    }, {
        tableName: 'inscricao',
        timestamps: true,
        underscored: true
    });
    return Inscricao;
};