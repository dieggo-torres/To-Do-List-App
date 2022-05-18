const mongoose = require('mongoose')

const conectarDB = async () => {
  try {
    const conexao = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(`MongoDB conectado: ${conexao.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = conectarDB
