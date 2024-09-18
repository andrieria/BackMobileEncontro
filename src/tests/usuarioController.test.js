const request = require('supertest');
const app = require('../app');
const { Usuario, Inscricao } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mocks
jest.mock('../models');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Usuario Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste para o cadastro de usuário
  describe('POST /usuarios/cadastrar', () => {
    it('deve cadastrar um novo usuário com sucesso', async () => {
      const newUser = {
        email: 'test@example.com',
        senha: 'senha123',
        confirmarSenha: 'senha123'
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      Usuario.findOne.mockResolvedValue(null); // Email não existente
      Usuario.create.mockResolvedValue({ id: 1, email: newUser.email });
      Inscricao.create.mockResolvedValue({ id: 1, usuario_id: 1, status: 'Em Análise' });

      const res = await request(app)
        .post('/api/usuarios/cadastrar')
        .send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Usuário e inscrição criados com sucesso!');
      expect(Usuario.create).toHaveBeenCalledWith({
        email: newUser.email,
        senha: 'hashedPassword',
        cpf: null
      });
    });

    it('deve retornar erro se o email já existir', async () => {
      const existingUser = { email: 'test@example.com', senha: 'senha123', confirmarSenha: 'senha123' };

      Usuario.findOne.mockResolvedValue(existingUser); // Email existente

      const res = await request(app)
        .post('/api/usuarios/cadastrar')
        .send(existingUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'E-mail já cadastrado.');
    });

    it('deve retornar erro se as senhas não coincidirem', async () => {
      const userData = { email: 'test@example.com', senha: 'senha123', confirmarSenha: 'senha124' };

      const res = await request(app)
        .post('/api/usuarios/cadastrar')
        .send(userData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'As senhas não coincidem.');
    });
  });

  // Teste para login de usuário
  describe('POST /usuarios/login', () => {
    it('deve logar um usuário com sucesso', async () => {
      const loginData = { email: 'test@example.com', senha: 'senha123' };
      const mockUser = { id: 1, email: loginData.email, senha: 'hashedPassword' };

      Usuario.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue('fakeToken');

      const res = await request(app)
        .post('/api/usuarios/login')
        .send(loginData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token', 'fakeToken');
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('deve retornar erro se as credenciais estiverem incorretas', async () => {
      const loginData = { email: 'test@example.com', senha: 'senha123' };

      Usuario.findOne.mockResolvedValue(null); // Usuário não encontrado

      const res = await request(app)
        .post('/api/usuarios/login')
        .send(loginData);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Credenciais inválidas.');
    });
  });

  // Teste para busca de usuário por ID
  describe('GET /usuarios/:id', () => {
    it('deve retornar o usuário pelo ID', async () => {
      const mockUser = { id: 1, email: 'test@example.com', inscricoes: [] };

      Usuario.findByPk.mockResolvedValue(mockUser);

      const res = await request(app)
        .get('/api/usuarios/1')
        .send();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('deve retornar erro se o usuário não for encontrado', async () => {
      Usuario.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/usuarios/999')
        .send();

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Usuário não encontrado.');
    });
  });

  // Teste para atualização de usuário
  describe('PUT /usuarios/atualizar/:id', () => {
    it('deve atualizar o usuário com sucesso', async () => {
      const updateUser = {
        nome_completo: 'Nome Atualizado',
        senha: 'novaSenha123'
      };
      const mockUser = { id: 1, update: jest.fn() };

      Usuario.findByPk.mockResolvedValue(mockUser);
      bcrypt.hash.mockResolvedValue('newHashedPassword');

      const res = await request(app)
        .put('/api/usuarios/atualizar/1')
        .send(updateUser);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Usuário atualizado com sucesso!');
      expect(mockUser.update).toHaveBeenCalledWith({
        nome_completo: updateUser.nome_completo,
        senha: 'newHashedPassword',
        cpf: undefined,
        data_nascimento: undefined,
        telefone: undefined,
        rua: undefined,
        bairro: undefined,
        cidade: undefined,
        estado: undefined,
        cep: undefined,
        sexo: undefined,
        nivel_escolaridade: undefined,
        email: undefined
      });
    });

    it('deve retornar erro se o usuário não for encontrado', async () => {
      Usuario.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/usuarios/atualizar/999')
        .send({ nome_completo: 'Nome Atualizado' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Usuário não encontrado.');
    });
  });
});
