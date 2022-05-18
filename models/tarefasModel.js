const mongoose = require('mongoose')

const tarefaSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Por favor, adicione um texto.'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Tarefa', tarefaSchema)
