const express = require('express')
const router = express.Router()

const {
  mostrarListaPadrao,
  criarNovaTarefa,
  removerTarefa,
  mostrarListaPersonalizada,
} = require('../controllers/handlers')

router.route('/').get(mostrarListaPadrao).post(criarNovaTarefa)
router.post('/remover', removerTarefa)
router.get('/:nomeLista', mostrarListaPersonalizada)

module.exports = router
