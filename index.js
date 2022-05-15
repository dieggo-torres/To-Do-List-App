const express = require('express')
const path = require('path')
const porta = 3000

const data = require(path.join(__dirname, '/data.js'))

const app = express()

const tarefas = ['Comprar Comida', 'Cozinhar Comida', 'Comer Comida']
const tarefasTrabalho = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const dia = data.obterDataCompleta()
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
