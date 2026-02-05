import { getLobinhos } from "./api.js";

const container = document.getElementById("lobinhos-container");
const pagination = document.getElementById("pagination");
const inputSearch = document.getElementById("search");
const checkFilter = document.getElementById("filter");

let currentPage = 1;
const LIMIT = 4;

async function loadPage(page = 1) {
    let extraParams = '';
    
    if (inputSearch.value) {
        extraParams += `&nome_like=${inputSearch.value}`;
    }
    
    if (checkFilter.checked) {
        extraParams += `&adotado=true`;
    }

    try {
        const { data, total } = await getLobinhos(page, LIMIT, extraParams);
        currentPage = page;
        renderLobinhos(data);
        renderPagination(total);
    } catch (err) {
        container.innerHTML = "<p>Erro ao carregar lobinhos.</p>";
        console.error(err);
    }
}

function renderLobinhos(lobinhos) {
    if (!lobinhos.length) {
        container.innerHTML = "<p>Nenhum lobinho encontrado.</p>";
        return;
    }

    container.innerHTML = lobinhos.map(lobo => `
        <div class="lobo-card">
            <img src="${lobo.imagem}" alt="${lobo.nome}">
            <h3>${lobo.nome}</h3>
            <p>Idade: ${lobo.idade} anos</p>
            <p class="status">${lobo.adotado ? "Já Adotado" : "Disponível"}</p>
            <a href="show.html?id=${lobo.id}">
                <button class="${lobo.adotado ? 'btn-adotado' : 'btn-adotar'}">
                    ${lobo.adotado ? 'Ver Detalhes' : 'Adotar'}
                </button>
            </a>
        </div>
    `).join('');
}

// NOVA LÓGICA DE PAGINAÇÃO LIMITADA
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / LIMIT);
    let buttonsHTML = "";

    // Define o intervalo de páginas a serem exibidas (máximo 5 botões)
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Ajusta o início se estivermos nas últimas páginas
    if (endPage - startPage < maxVisibleButtons - 1) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Botão de "Primeira Página" se não estiver visível
    if (startPage > 1) {
        buttonsHTML += `<button onclick="loadPage(1)">1</button>`;
        if (startPage > 2) buttonsHTML += `<span>...</span>`;
    }

    // Gera os botões numerados dentro do intervalo
    for (let i = startPage; i <= endPage; i++) {
        buttonsHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="loadPage(${i})">
                ${i}
            </button>`;
    }

    // Botão de "Última Página" se não estiver visível
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) buttonsHTML += `<span>...</span>`;
        buttonsHTML += `<button onclick="loadPage(${totalPages})">${totalPages}</button>`;
    }

    pagination.innerHTML = buttonsHTML;
}

inputSearch.addEventListener('input', () => loadPage(1));
checkFilter.addEventListener('change', () => loadPage(1));

window.loadPage = loadPage;
loadPage(1);