const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarios.controller');

router.post('/', funcionarioController.criar);
router.get('/', funcionarioController.listarTodos);
router.get('/:id', funcionarioController.buscarPorId);
router.put('/:id', funcionarioController.atualizar);
router.delete('/:id', funcionarioController.deletar);

router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota funcionando!' });
});

module.exports = router;





