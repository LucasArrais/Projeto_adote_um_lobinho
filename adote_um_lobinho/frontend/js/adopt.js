import { getLobinhoById, patchLobinho } from "./api.js";

const nomeSpan = document.getElementById("Nome_do_lobo");
const idSpan = document.getElementById("id_do_lobo");
const fotoImg = document.getElementById("foto_do_lobo");

const form = document.getElementById("form");
const mensagemAdotado = document.getElementById("mensagem-adotado");

const nomePessoa = document.getElementById("nome_pessoa");
const idadePessoa = document.getElementById("idade_pessoa");
const emailPessoa = document.getElementById("email_pessoa");

const params = new URLSearchParams(window.location.search);
const lobinhoId = params.get("id");

if (!lobinhoId) {
  alert("Lobinho não informado!");
  throw new Error("ID não encontrado na URL");
}

async function carregarLobinho() {
  try {
    const lobinho = await getLobinhoById(lobinhoId);

    nomeSpan.textContent = lobinho.nome;
    idSpan.textContent = lobinho.id;
    fotoImg.src = lobinho.imagem;
    fotoImg.alt = lobinho.nome;

    if (lobinho.adotado) {
  alert("Este lobinho já foi adotado 💙");
  window.location.href = "list.html";
  return;
}


  } catch (err) {
    console.error(err);
    alert("Erro ao carregar lobinho");
  }
}

carregarLobinho();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await patchLobinho(lobinhoId, {
      adotado: true,
      nomeDono: nomePessoa.value,
      idadeDono: Number(idadePessoa.value),
      emailDono: emailPessoa.value
    });

    alert("Adoção realizada com sucesso 🐺💙");
    window.location.href = "list.html";

  } catch (err) {
    console.error(err);
    alert("Erro ao realizar adoção");
  }
});
