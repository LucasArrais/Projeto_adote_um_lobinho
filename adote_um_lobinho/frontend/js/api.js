const API_BASE = 'http://localhost:3000';


// Função base pra evitar repetição
async function request(url, options = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}`);
  }

  return res;
}

// LISTAR COM PAGINAÇÃO
export async function getLobinhosPaginated(page = 1, limit = 4, filters = "") {
  const url = `${API_BASE}/lobinhos?_page=${page}&_limit=${limit}${filters}`;

  const res = await request(url);
  const data = await res.json();

  const total = res.headers.get("X-Total-Count");

  return {
    data,
    total: Number(total)
  };
}

// Listas todos os lobinhos ou filtra por parâmetros
export async function getLobinhos(params = '') {
  const res = await fetch(`${API_BASE}/lobinhos${params}`);

  if (!res.ok) {
    throw new Error('Erro ao buscar lobinhos');
  }

  return res.json();
}

// Busca um lobinho específico por ID
async function getLobinhoById(id) {
  const res = await fetch(`${API_BASE}/lobinhos/${id}`);

  if (!res.ok) {
    throw new Error('Erro ao buscar lobinho');
  }

  return res.json();
}

// Adiciona um novo lobinho
export async function postLobinho(data) {
  const res = await fetch(`${API_BASE}/lobinhos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Erro ao adicionar lobinho');
  }

  return res.json();
}

// Adota um lobinho
export async function patchLobinho(id, data) {
  const res = await fetch(`${API_BASE}/lobinhos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar lobinho');
  }

  return res.json();
}

// Deleta um lobinho
async function deleteLobinho(id) {
  const res = await fetch(`${API_BASE}/lobinhos/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar lobinho');
  }

  return true;
}