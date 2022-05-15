const obterDataCompleta = () => {
  // Opções de formatação da string de data
  const opcoes = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }

  // Obtém a data atual
  const hoje = new Date()

  // Retorna a data atual formatada em Português do Brasil
  return hoje.toLocaleDateString('pt-BR', opcoes)
}

const obterDiaSemana = () => {
  // Opções de formatação da string de data
  const opcoes = {
    weekday: 'long',
  }

  // Obtém a data atual
  const hoje = new Date()

  // Retorna a data atual formatada em Português do Brasil
  return hoje.toLocaleDateString('pt-BR', opcoes)
}

module.exports = {
  obterDataCompleta,
  obterDiaSemana,
}
