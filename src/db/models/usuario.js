module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha: { type: DataTypes.STRING, allowNull: false },
        nome_completo: { type: DataTypes.STRING, allowNull: true },
        cpf: { type: DataTypes.STRING(11), allowNull: true, unique: true },
        data_nascimento: { type: DataTypes.DATE, allowNull: true },
        telefone: { type: DataTypes.STRING, allowNull: true },
        rua: { type: DataTypes.STRING, allowNull: true },
        bairro: { type: DataTypes.STRING, allowNull: true },
        cidade: { type: DataTypes.STRING, allowNull: true },
        estado: { type: DataTypes.STRING(2), allowNull: true },
        cep: { type: DataTypes.STRING(8), allowNull: true },
        sexo: { type: DataTypes.ENUM('M', 'F', 'Outro'), allowNull: true },
        nivel_escolaridade: { type: DataTypes.STRING, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'usuario',
        timestamps: false
    });

    Usuario.associate = function (models) {
        Usuario.hasMany(models.Inscricao, { foreignKey: 'usuario_id' });
    };

    return Usuario;
};
