const funcionarioService = require('../services/funcionarios.service');

module.exports = {
  criar: async (req, res) => {
    try {
      const funcionario = await funcionarioService.criar(req.body);
      res.status(201).json(funcionario);
    } catch (err) {
      console.error(err);
      if (err.code === 'P2002') {
        return res.status(400).json({ erro: 'CPF ou e-mail já cadastrados' });
      }
      res.status(500).json({ erro: 'Erro ao criar funcionário' });
    }
  },

  listarTodos: async (req, res) => {
    try {
      const funcionarios = await funcionarioService.listarTodos();
      res.json(funcionarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar funcionários' });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const funcionario = await funcionarioService.buscarPorId(Number(req.params.id));
      if (!funcionario) {
        return res.status(404).json({ erro: 'Funcionário não encontrado' });
      }
      res.json(funcionario);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao buscar funcionário' });
    }
  },

  atualizar: async (req, res) => {
  try {
    const funcionario = await funcionarioService.atualizar(Number(req.params.id), req.body);
    res.json(funcionario);
  } catch (err) {
    console.error(err);

    if (err.code === 'P2002') {
      return res.status(400).json({
        erro: 'CPF ou e-mail já cadastrados',
        campo: err.meta?.target
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        erro: 'Funcionário não encontrado para atualizar'
      });
    }

    res.status(500).json({ erro: 'Erro ao atualizar funcionário' });
  }
},


  deletar: async (req, res) => {
    try {
      await funcionarioService.deletar(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao deletar funcionário' });
    }
  }
};


