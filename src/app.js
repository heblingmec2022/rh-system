// backend/src/app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const funcionarioRoutes = require('./routes/funcionarios.routes');
app.use('/api/funcionarios', funcionarioRoutes);

app.post('/api/teste-direto', (req, res) => {
  res.json({ mensagem: 'POST direto funcionando!' });
});

module.exports = app;
