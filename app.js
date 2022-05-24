const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

// Porta em que o servidor express ouve por requisições
const porta = process.env.PORT || 3000

// Arquivo com a configuração do banco de dados
const conectarDB = require("./config/db")

// Arquivo que contém os modelos
const { Tarefa, Lista } = require("./models/tarefasModel")

// Servidor Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Faz o servidor usar uma pasta que contém arquivos estáticos
app.use(express.static("public"))

// Define o view engine como ejs
app.set("view engine", "ejs")

// Faz a conexão com o banco de dados (MongoDB Atlas)
conectarDB()

// Rotas da aplicação
app.use("/", require("./routes/rotas"))

app.listen(porta, () => {
  console.log(`Servidor Express ouvindo na porta ${porta}.`)
})
