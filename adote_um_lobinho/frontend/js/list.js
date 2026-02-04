import { getLobinhos, patchLobinho } from "./api.js";

const container = document.getElementById("lobinhos-container");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const LIMIT = 4;

async function loadPage(page) {
  try {
    const { data, total } = await getLobinhos(page, LIMIT);
    currentPage = page;
    renderLobinhos(data);
    renderPagination(total);
  } catch (err) {
    container.innerHTML = "<p>Erro ao carregar lobinhos</p>";
    console.error(err);
  }
}

function renderLobinhos(lobinhos) {
  if (!lobinhos.length) {
    container.innerHTML = "<p>Nenhum lobinho encontrado</p>";
    return;
  }

  container.innerHTML = lobinhos.map(lobo => `
    <div class="lobo-card">
      <img src="${lobo.imagem}" alt="${lobo.nome}">
      <h3>${lobo.nome}</h3>
      <p>${lobo.descricao}</p>
      <p>${lobo.adotado ? `Adotado por: ${lobo.adotadoPor}` : "Disponível para adoção"}</p>
      <button 
        class="${lobo.adotado ? 'btn-adotado' : 'btn-adotar'}" 
        ${lobo.adotado ? 'disabled' : ''} 
        onclick="handleAdotar('${lobo.id}')">
        ${lobo.adotado ? 'Adotado' : 'Adotar'}
      </button>
    </div>
  `).join('');
}

// Renderiza os botões de paginação
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / LIMIT);
  let buttonsHTML = "";

  const maxButtons = 5; // Quantidade máxima de botões a exibir
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // Caso esteja no final da lista, ajusta o início
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  // Botão "Primeira"
  if (startPage > 1) {
    buttonsHTML += `<button onclick="loadPage(1)">1</button>`;
    if (startPage > 2) buttonsHTML += `<span>...</span>`;
  }

  // Números do centro
  for (let i = startPage; i <= endPage; i++) {
    buttonsHTML += `
      <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadPage(${i})">
        ${i}
      </button>`;
  }

  pagination.innerHTML = buttonsHTML;
}

window.loadPage = loadPage;

window.handleAdotar = async (id) => {
  const nomePessoa = prompt("Seu nome:");
  if (!nomePessoa) return;

  try {
    await patchLobinho(id, {
      adotado: true,
      adotadoPor: nomePessoa
    });
    loadPage(currentPage);
  } catch (err) {
    alert("Erro ao adotar lobinho.");
  }
};

loadPage(1);