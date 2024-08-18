require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/router');
const bodyParser = require('body-parser');
const cors = require('cors');
// Configuração do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Habilita CORS
app.use(bodyParser.json()); // Permite parsing de JSON
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

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
module.exports = app;