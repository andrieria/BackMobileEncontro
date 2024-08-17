require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/router');
// Configuração do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco de dados
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
// Usando as rotas de administrador
app.use('/api', routes); // Prefixando as rotas com /api
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
