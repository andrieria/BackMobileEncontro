// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Middleware para tratar erros 404 (rota não encontrada)
app.use((req, res, next) => {
  res.status(404).send({ message: 'Rota não encontrada' });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Ocorreu um erro no servidor!' });
});

// Iniciar o servidor
app.listen(PORT, (err) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  console.log(`Servidor rodando na porta ${PORT}`);
});
