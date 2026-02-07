import { getLobinhos } from "./api.js";

const container = document.getElementById("lobinhos-container");
const pagination = document.getElementById("pagination");
const inputSearch = document.getElementById("search");
const checkFilter = document.getElementById("filter");

let currentPage = 1;
const LIMIT = 4;

async function loadPage(page = 1) {
    let extraParams = '';
    if (inputSearch.value) extraParams += `&nome_like=${inputSearch.value}`;
    if (checkFilter.checked) extraParams += `&adotado=true`;

    try {
        const { data, total } = await getLobinhos(page, LIMIT, extraParams);
        currentPage = page;
        renderLobinhos(data);
        renderPagination(total); 
    } catch (err) {
        container.innerHTML = "<p>Erro ao conectar com a API.</p>";
    }
}

function renderLobinhos(lobinhos) {
    if (!lobinhos.length) {
        container.innerHTML = "<p>Nenhum lobinho encontrado.</p>";
        return;
    }

    container.innerHTML = lobinhos.map((lobo, index) => `
        <article class="lobo-card ${index % 2 !== 0 ? 'card-reverse' : ''}">
            <div class="lobo-image-container">
                <img src="${lobo.imagem}" alt="Foto de ${lobo.nome}">
            </div>
            <div class="lobo-content">
                <div class="lobo-header">
                    <div>
                        <h3>${lobo.nome}</h3>
                        <span>Idade: ${lobo.idade} anos</span>
                    </div>
                    <button class="${lobo.adotado ? 'btn-ja-adotado' : 'btn-adotar'}" 
                            onclick="location.href='show.html?id=${lobo.id}'">
                        ${lobo.adotado ? 'Adotado' : 'Adotar'}
                    </button>
                </div>
                <p class="lobo-descricao">${lobo.descricao || "Este lobinho está ansioso para te conhecer!"}</p>
            </div>
        </article>
    `).join('');
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / LIMIT);
    if (totalPages <= 1) {
        pagination.innerHTML = "";
        return;
    }

    let buttonsHTML = "";
    const maxVisibleButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
        buttonsHTML += `<button class="page-btn" onclick="loadPage(1)">1</button>`;
        if (startPage > 2) buttonsHTML += `<span class="dots">...</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        buttonsHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="loadPage(${i})">
                ${i}
            </button>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) buttonsHTML += `<span class="dots">...</span>`;
        buttonsHTML += `<button class="page-btn" onclick="loadPage(${totalPages})">${totalPages}</button>`;
    }

    pagination.innerHTML = buttonsHTML;
}

inputSearch.addEventListener('input', () => loadPage(1));
checkFilter.addEventListener('change', () => loadPage(1));

window.loadPage = loadPage;
loadPage(1);