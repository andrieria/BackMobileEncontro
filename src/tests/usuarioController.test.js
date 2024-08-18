// tests/usuarioController.test.js
const request = require('supertest');
const app = require('../app'); // Caminho para o seu arquivo principal do Express
const { Usuario } = require('../models'); // Caminho para o seu modelo Usuario

describe('POST /api/usuarios/cadastrar', () => {
  beforeAll(async () => {
    // Limpar o banco de dados antes dos testes, se necessário
    await Usuario.destroy({ where: {} });
  });

  it('should successfully create a new user with valid data', async () => {
    const response = await request(app)
      .post('/api/usuarios/cadastrar')
      .send({
        email: 'test@example.com',
        senha: 'password123',
        confirmarSenha: 'password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuário cadastrado com sucesso!');
    expect(response.body.usuario).toHaveProperty('email', 'test@example.com');
  });

  it('should return an error if passwords do not match', async () => {
    const response = await request(app)
      .post('/api/usuarios/cadastrar')
      .send({
        email: 'test2@example.com',
        senha: 'password123',
        confirmarSenha: 'password456'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('As senhas não coincidem.');
  });

});
