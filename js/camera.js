const btnIniciarCamera = document.querySelector("[data-video-botao]")
const campoCamera = document.querySelector("[data-camera]")
const video = document.querySelector("[data-video]")

const btnTirarFoto = document.querySelector("[data-tirar-foto]")
const canvas = document.querySelector("[data-video-canvas]")
const mensagem = document.querySelector("[data-mensagem]")

const btnEnviarFoto = document.querySelector("[data-enviar]")

let imagemURL = ""

btnIniciarCamera.addEventListener("clock", async function () {
  // solicitando para o navegador o uso apenas da camera
  // colocado async function e await, pois precisamos esperar o usuário liberar a solicitação da camera
  const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

  // tirando o botão de iniciar a camera
  btnIniciarCamera.style.display = "none"

  // colocando o campoCamera
  campoCamera.style.display = "block"

  // recebendo o acesso e iniciando
  video.srcObject = iniciarVideo
})

btnTirarFoto.addEventListener("click", function(){
  // criando um canvas com o video que estava quando o botão foi clicado(tirar a foto)
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height)

  // transformando a imagem em url
  imagemURL = canvas.toDataURL("imagem/jpeg");

  // tirando a camera
  campoCamera.style.display = "none";

  // colocando a mensagem para aparecer
  mensagem.style.display = "block";
})

btnEnviarFoto.addEventListener("click", () => {
  // pegando o cadastro no localStorage
  const receberDadosExistentes = localStorage.getItem("cadastro")

  // converte o localStorage para json
  const converteRetorno = JSON.parse(receberDadosExistentes)

  // criando o atributo imagem e colocando a url da imagem
  converteRetorno.imagem = imagemURL

  // colocando o cadastro de volta no localStorage
  localStorage.setItem("cadastro", JSON.stringify(converteRetorno))

  // direcionando para a terceira pagina do form
  window.location.href = "./abrir-conta-form-3.html"
})