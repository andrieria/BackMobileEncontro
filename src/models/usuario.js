module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: { type: DataTypes.INTEGER, primarykey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha: { type: DataTypes.STRING, allowNull: false },
        nome_completo: { type: DataTypes.STRING, allowNull: false },
        cpf: { type: DataTypes.STRING(11), allowNull: false, unique: true },
        data_nascimento: { type: DataTypes.STRING, allowNull: false },
        telefone: DataTypes.STRING,
        rua: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING(2),
        cep: DataTypes.STRING(8),
        sexo: DataTypes.ENUM('M', 'F', 'Outro'),
        nivel_escolaridade: DataTypes.STRING,
        createdAt:
    }, {
        tableName: 'usuario'
    });
}