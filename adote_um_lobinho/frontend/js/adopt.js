import { getLobinhoById, patchLobinho } from './api.js';

const loboNomeSpan = document.getElementById('Nome_do_lobo');
const loboIdSpan = document.getElementById('id_do_lobo');
const loboImg = document.getElementById('foto_do_lobo');
const form = document.getElementById('form');

// Pega o ID que veio da list.html ou show.html
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function init() {
    if (!id) {
        alert("Nenhum lobinho selecionado!");
        window.location.href = 'list.html';
        return;
    }

    try {
        const lobo = await getLobinhoById(id);
        
        // Preenche os dados do lobo no topo da página
        loboNomeSpan.innerText = lobo.nome;
        loboIdSpan.innerText = lobo.id;
        loboImg.src = lobo.imagem;
    } catch (error) {
        console.error("Erro ao carregar lobo:", error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    e.stopImmediatePropagation();

    const payload = {
        adotado: true,
        nomeDono: document.getElementById('nome_pessoa').value,
        idadeDono: parseInt(document.getElementById('idade_pessoa').value),
        emailDono: document.getElementById('email_pessoa').value
    };

    try {
        console.log("Enviando dados...");
        await patchLobinho(id, payload);
        
        alert("Sucesso! O lobinho foi adotado.");

        setTimeout(() => {
            window.location.assign('list.html');
        }, 0);

    } catch (error) {
        console.error("Erro fatal:", error);
        alert("Erro ao adotar. Verifique o console.");
    }
    
    return false;
});

init();  