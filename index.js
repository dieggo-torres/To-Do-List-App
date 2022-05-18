// Importa o módulo express
const express = require('express')

// Importa o módulo dotenv para  carregar variáveis de ambiente
const dotenv = require('dotenv').config()

// Importa o módulo colors para formatação de textos no console
const colors = require('colors')

// Importa o módulo mongoose para interação com o MongoDB
const mongoose = require('mongoose')

// Importa o módulo path para facilitar o trabalho com caminhos
const path = require('path')

// Define a porta em que o servidor express ouve por requisições
const porta = process.env.PORT || 3000

// Importa o arquivo com a configuração do banco de dados
const conectarDB = require('./config/db')

// Importa o arquivo que contém os modelos
const Tarefa = require('./models/tarefasModel')

// Importa o módulo de data
const data = require(path.join(__dirname, '/data.js'))

// Cria uma instância do express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Faz o servidor usar uma pasta que contém arquivos estáticos
app.use(express.static('public'))

// Define o view engine como ejs
app.set('view engine', 'ejs')

// Faz a conexão com o banco de dados (MongoDB Atlas)
conectarDB()

// Tarefas padrão
const tarefa1 = new Tarefa({
  nome: 'Bem-vindo(a) a seu app de lista de tarefas!',
})

const tarefa2 = new Tarefa({
  nome: 'Pressione o botão + para adicionar uma nova tarefa.',
})

const tarefa3 = new Tarefa({
  nome: '<-- Pressione este botão para remover uma tarefa.',
})

// Array com as tarefas padrão
const tarefasPadrao = [tarefa1, tarefa2, tarefa3]

app.get('/', (req, res) => {
  const dia = data.obterDataCompleta()

  // Busca todas as tarefas na coleção tarefas
  Tarefa.find({}, (erro, tarefas) => {
    if (tarefas.length === 0) {
      // Insere os items do array na coleção tarefas
      Tarefa.insertMany(tarefasPadrao, (erro) => {
        if (erro) {
          console.log(erro)
        } else {
          console.log('As tarefas foram adicionadas com sucesso.')
        }
      })
      res.redirect('/')
    } else {
      res.render('lista', { tituloLista: dia, minhasTarefas: tarefas })
    }
  })
})

app.post('/', (req, res) => {
  const novoItem = req.body.tarefa

  const novaTarefa = new Tarefa({
    nome: novoItem,
  })

  novaTarefa.save()

  res.redirect('/')

  // if (req.body.lista === 'Trabalho') {
  //   tarefasTrabalho.push(tarefa)
  //   res.redirect('/trabalho')
  // } else {
  //   tarefas.push(tarefa)
  //   res.redirect('/')
  // }
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
