const express = require('express')
const porta = 3000

const app = express()

let tarefas = ['Comprar Comida', 'Cozinhar Comida', 'Comer Comida']

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let opcoes = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }

  let hoje = new Date()
  let dia = hoje.toLocaleDateString('pt-BR', opcoes)

  res.render('lista', { dataCompleta: dia, minhasTarefas: tarefas })
})

app.post('/', (req, res) => {
  let tarefa = req.body.tarefa
  tarefas.push(tarefa)
  res.redirect('/')
})

app.listen(porta, () => {
  console.log(`Servidor Express ouvindo na porta ${porta}.`)
})
