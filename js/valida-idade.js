export default function ehMaiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value);
  if (!validaIdade(dataNascimento)) {
    // Com o método setCustomValidity é possível alterar o valor de customError
    campo.setCustomValidity("O usuário não é maior de idade")
  }
}

function validaIdade(data) {
  // pegando data atual
  const dataAtual = new Date

  // pegando o ano e adicionando 18, pegando o mes e o dia
  const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

  // comparando pra ver se eh maior ou igual a data atual
  return dataAtual >= dataMais18 
}