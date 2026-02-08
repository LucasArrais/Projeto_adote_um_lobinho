import { getLobinhoById, deleteLobinho } from './api.js';

// Captura o ID da URL (?id=1000)
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function carregarPagina() {
    const id = getIdFromUrl();

    if (!id) {
        alert("Lobinho não selecionado!");
        window.location.href = 'index.html';
        return;
    }

    try {
        const lobo = await getLobinhoById(id);
        renderizarLobo(lobo);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        document.getElementById('Nome_do_lobo').innerText = "Erro 404";
        document.querySelector('#texto p').innerText = "Não conseguimos encontrar este lobinho em nossa alcateia.";
    }
}

function renderizarLobo(lobo) {
    const nomeEl = document.getElementById('Nome_do_lobo');
    const fotoEl = document.getElementById('foto_do_lobo');
    const descricaoEl = document.querySelector('#texto p');
    const btnAdotar = document.getElementById('botao_adotar');
    const btnExcluir = document.getElementById('botao_excluir');

    // Preenchendo dados básicos
    nomeEl.innerText = lobo.nome;
    fotoEl.src = lobo.imagem;
    fotoEl.alt = `Foto de ${lobo.nome}`;

    // Montando o texto com idade e descrição
    descricaoEl.innerHTML = `
        <strong>Idade:</strong> ${lobo.idade} anos <br><br>
        ${lobo.descricao}
    `;

    // Lógica baseada no seu JSON (adotado: true/false)
    if (lobo.adotado) {
        btnAdotar.innerText = `ADOTADO POR ${lobo.nomeDono.toUpperCase()}`;
        btnAdotar.disabled = true;
        btnAdotar.style.opacity = "0.6";
        btnAdotar.style.cursor = "not-allowed";
        
        // Adiciona um aviso extra na descrição
        descricaoEl.innerHTML += `<br><br><em>Status: Este lobinho já possui um lar feliz.</em>`;
    } else {
        btnAdotar.addEventListener('click', () => {
            window.location.href = `adopt.html?id=${lobo.id}`;
        });
    }

    // Lógica de exclusão
    btnExcluir.addEventListener('click', async () => {
        if (confirm(`Tem certeza que deseja excluir o registro de ${lobo.nome}?`)) {
            try {
                btnExcluir.disabled = true;
                btnExcluir.innerText = "EXCLUINDO...";
                await deleteLobinho(lobo.id);
                alert("Registro removido.");
                window.location.href = 'list.html';
            } catch (error) {
                alert("Erro ao excluir.");
                btnExcluir.disabled = false;
                btnExcluir.innerText = "EXCLUIR";
            }
        }
    });
}

carregarPagina();