const express = require('express')
const porta = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let hoje = new Date()
  let diaSemana = hoje.getDay()
  let dia = ''

  switch (diaSemana) {
    case 0:
      dia = 'domingo'
      break
    case 1:
      dia = 'segunda-feira'
      break
    case 2:
      dia = 'terça-feira'
      break
    case 3:
      dia = 'quarta-feira'
      break
    case 4:
      dia = 'quinta-feira'
      break
    case 5:
      dia = 'sexta-feira'
      break
    case 6:
      dia = 'sábado'
      break
    default:
      console.log(`Erro: dia atual é ${dia}.`)
      break
  }

  res.render('lista', { tipoDia: dia })
})

app.listen(porta, () => {
  console.log(`Servidor Express ouvindo na porta ${porta}.`)
})
