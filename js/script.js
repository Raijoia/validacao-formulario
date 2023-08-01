// importando a função
import ehUmCPF from "./valida-cpf.js";

// importando a função
import ehMaiorDeIdade from "./valida-idade.js";

// pegando todos os elementos do html que tiverem o atributo required
const camposDoForm = document.querySelectorAll("[required]");

// pegando o formulario
const form = document.querySelector("[data-formulario]")

// ao enviar o formulario
// e => evento
form.addEventListener("submit", (e) => {
  // para não dar reload na página
  e.preventDefault();

  // pegando todos os valores dos input e guardando no object
  const listaRespostas = {
    // pega o valor pelo target e o elements pelo nome
    nome: e.target.elements["nome"].value,
    email: e.target.elements["email"].value,
    rg: e.target.elements["rg"].value,
    cpf: e.target.elements["cpf"].value,
    aniversario: e.target.elements["aniversario"].value
  }

  // adicionando a listasRespostas no localStorage da página com o nome de cadastro e enviando tudo como JSON em uma string com o Stringfy
  localStorage.setItem("cadastro", JSON.stringify(listaRespostas))

  // mudando para a segunda pagina do form após dar submit
  window.location.href = './abrir-conta-form-2.html'
})


// para cada campo(elementoInput)
camposDoForm.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo))

  // tirando a mensagem de erro de validação padrão
  campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
  // sem valor
  'valueMissing',

  // tipo do valor inválido
  'typeMismatch',

  // não está seguindo o regExp
  'patternMismatch',

  // Não tem carácter suficiente
  'tooShort',

  // custom para os erros de menor de idade e cpf inválido
  'customError'
]

const mensagens = {
  // input text(name)
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido.",
  },
  // input email
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
  // input text(rg)
  rg: {
    valueMissing: "O campo de RG não pode estar vazio.",
    patternMismatch: "Por favor, preencha um RG válido.",
    tooShort: "O campo de RG não tem caractéres suficientes.",
  },
  // input text(cpf)
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF não tem caractéres suficientes.",
  },
  // input date
  aniversario: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar.",
  },
  // input checkbox(termos)
  termos: {
    valueMissing: "Você deve aceitar nossos termos antes de continuar.",
  },
}

function verificaCampo(campo) {
  let mensagem = ''
  campo.setCustomValidity("")

  // verifica se o campo é do cpf e se tem mais de 11 dígitos
  if (campo.name == "cpf" && campo.value.length >=11) {
    ehUmCPF(campo)
  }

  // verifica se o campo é o da data e se não esta vazio
  if (campo.name == "aniversario" && campo.value != "") {
    ehMaiorDeIdade(campo)
  }

  // para cada de tipo de erro
  tiposDeErro.forEach(erro => {
    // campo.validity pega o erro, [erro] qual o erro, se for true
    if (campo.validity[erro]) {
      // pega a mensagem pelo nome do campo e o erro
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem);
    }
  })

  // pegando o span com classe mensagem-erro, o parentNode pega oque estiver mais perto do input que deu erro
  const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')

  // valida se o campo está valido
  const validadorDeInput = campo.checkValidity()

  // se o campo não estiver valido
  if (!validadorDeInput) { 
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = "";
  }
}