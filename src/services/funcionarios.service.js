const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  criar: (data) => prisma.funcionario.create({ data }),

  listarTodos: () => prisma.funcionario.findMany({
    include: {
      cargo: true,
      setor: true
    }
  }),

  buscarPorId: (id) => prisma.funcionario.findUnique({
    where: { id },
    include: {
      cargo: true,
      setor: true
    }
  }),

  atualizar: (id, data) => prisma.funcionario.update({
    where: { id },
    data
  }),

  deletar: (id) => prisma.funcionario.delete({
    where: { id }
  })
};

