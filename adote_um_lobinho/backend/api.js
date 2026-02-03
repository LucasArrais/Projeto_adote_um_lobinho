const API_BASE = 'http://localhost:3000';


// Listas todos os lobinhos ou filtra por parâmetros
async function getLobinhos(params = '') {
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
async function postLobinho(data) {
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
async function patchLobinho(id, data) {
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