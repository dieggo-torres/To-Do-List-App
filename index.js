const express = require('express')
const porta = 3000

const app = express()

let tarefas = ['Comprar Comida', 'Cozinhar Comida', 'Comer Comida']
let tarefasTrabalho = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let opcoes = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }

  let hoje = new Date()
  let dia = hoje.toLocaleDateString('pt-BR', opcoes)

  res.render('lista', { tituloLista: dia, minhasTarefas: tarefas })
})

app.post('/', (req, res) => {
  let tarefa = req.body.tarefa

  if (req.body.lista === 'Trabalho') {
    tarefasTrabalho.push(tarefa)
    res.redirect('/trabalho')
  } else {
    tarefas.push(tarefa)
    res.redirect('/')
  }
})

app.get('/trabalho', (req, res) => {
  res.render('lista', {
    tituloLista: 'Trabalho',
    minhasTarefas: tarefasTrabalho,
  })
})

app.get('/sobre', (req, res) => {
  res.render('sobre')
})

app.listen(porta, () => {
  console.log(`Servidor Express ouvindo na porta ${porta}.`)
})
