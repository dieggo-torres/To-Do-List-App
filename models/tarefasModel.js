const mongoose = require('mongoose')

const tarefaSchema = mongoose.Schema(
  {
    nome: String,
  },
  {
    timestamps: true,
  }
)

const Tarefa = mongoose.model('Tarefa', tarefaSchema)

const listaSchema = mongoose.Schema(
  {
    nome: String,
    itens: [tarefaSchema],
  },
  {
    timestamps: true,
  }
)

const Lista = mongoose.model('Lista', listaSchema)

module.exports = {
  Tarefa,
  Lista,
}
