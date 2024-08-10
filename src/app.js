require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

// Configuração do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// Conectar ao banco de dados
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
