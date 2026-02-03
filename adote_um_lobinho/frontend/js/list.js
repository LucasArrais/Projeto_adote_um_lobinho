import { getLobinhosPaginated, patchLobinho } from "./api.js";

const container = document.getElementById("lobinhos-container");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const LIMIT = 4;

// Carrega uma página
async function loadPage(page) {
  try {
    const { data, total } = await getLobinhosPaginated(page, LIMIT);

    currentPage = page;
    renderLobinhos(data);
    renderPagination(total);
  } catch (err) {
    container.innerHTML = "<p>Erro ao carregar lobinhos</p>";
    console.error(err);
  }
}

// Cria os cards no DOM
function renderLobinhos(lobinhos) {
  container.innerHTML = "";

  lobinhos.forEach(lobo => {
    const card = document.createElement("div");
    card.className = "lobo-card";

    const img = document.createElement("img");
    img.src = lobo.foto;
    img.alt = lobo.nome;

    const nome = document.createElement("h3");
    nome.innerText = lobo.nome;

    const desc = document.createElement("p");
    desc.innerText = lobo.descricao;

    const status = document.createElement("p");
    status.innerText = lobo.adotado
      ? `Adotado por: ${lobo.adotadoPor}`
      : "Disponível para adoção";

    const btn = document.createElement("button");

    if (lobo.adotado) {
      btn.innerText = "Adotado";
      btn.disabled = true;
      btn.className = "btn-adotado";
    } else {
      btn.innerText = "Adotar";
      btn.className = "btn-adotar";

      btn.addEventListener("click", async () => {
        const nomePessoa = prompt("Seu nome:");

        if (!nomePessoa) return;

        await patchLobinho(lobo.id, {
          adotado: true,
          adotadoPor: nomePessoa
        });

        loadPage(currentPage);
      });
    }

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(desc);
    card.appendChild(status);
    card.appendChild(btn);

    container.appendChild(card);
  });
}

// Renderiza os botões de página
function renderPagination(totalItems) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / LIMIT);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.className = "page-btn active";
    } else {
      btn.className = "page-btn";
    }

    btn.addEventListener("click", () => {
      loadPage(i);
    });

    pagination.appendChild(btn);
  }
}

// Inicial
loadPage(1);
