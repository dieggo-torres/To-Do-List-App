const _ = require('lodash')

const { Tarefa, Lista } = require('../models/tarefasModel')

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

// @desc     GET lista padrão
// @route    GET /lista
// @access   Public
const mostrarListaPadrao = (req, res) => {
  Tarefa.find({}, (erro, tarefas) => {
    if (tarefas.length === 0) {
      Tarefa.insertMany(tarefasPadrao, (erro) => {
        if (!erro) {
          console.log(erro)
        } else {
          console.log('As tarefas foram adicionadas com sucesso.')
        }
      })
      res.redirect('/')
    } else {
      res.render('lista', { tituloLista: 'Hoje', minhasTarefas: tarefas })
    }
  })
}

// @desc     POST
// @route    POST /lista
// @access   Public
const criarNovaTarefa = (req, res) => {
  const novoItem = req.body.tarefa
  const nomeLista = req.body.lista

  const novaTarefa = new Tarefa({
    nome: novoItem,
  })

  if (nomeLista === 'Hoje') {
    novaTarefa.save()
    res.redirect('/')
  } else {
    Lista.findOne({ nome: nomeLista }, (erro, listaEncontrada) => {
      if (!erro) {
        listaEncontrada.itens.push(novaTarefa)
        listaEncontrada.save()
        res.redirect('/' + nomeLista)
      }
    })
  }
}

// @desc     POST
// @route    POST /lista/remover
// @access   Public
const removerTarefa = (req, res) => {
  const idItemMarcado = req.body.checkbox
  const nomeLista = req.body.listaNome

  if (nomeLista === 'Hoje') {
    Tarefa.findOneAndRemove({ _id: idItemMarcado }, (erros) => {
      if (!erros) {
        res.redirect('/')
      }
    })
  } else {
    Lista.findOneAndUpdate(
      { nome: nomeLista },
      { $pull: { itens: { _id: idItemMarcado } } },
      (erro, listaEncontrada) => {
        if (!erro) {
          res.redirect('/' + nomeLista)
        }
      }
    )
  }
}

// @desc     GET lista padrão
// @route    GET /lista/:nomeLista
// @access   Public
const mostrarListaPersonalizada = (req, res) => {
  const nomeListaPersonalizada = _.capitalize(req.params.nomeLista)

  Lista.findOne({ nome: nomeListaPersonalizada }, (erro, listaEncontrada) => {
    if (!erro) {
      if (!listaEncontrada) {
        const novaLista = new Lista({
          nome: nomeListaPersonalizada,
          itens: tarefasPadrao,
        })
        novaLista.save()
        res.redirect('/' + nomeListaPersonalizada)
      } else {
        res.render('lista', {
          tituloLista: listaEncontrada.nome,
          minhasTarefas: listaEncontrada.itens,
        })
      }
    }
  })
}

module.exports = {
  mostrarListaPadrao,
  criarNovaTarefa,
  removerTarefa,
  mostrarListaPersonalizada,
}
