const API_BASE = 'http://localhost:3000';

// Listas todos os lobinhos ou filtra por parâmetros mesclada com paginação
export async function getLobinhos(page = 1, limit = 4, extraParams = '') {
    // Aqui a URL usa paginação e quaisquer parâmetros extras (filtros)
    const url = `${API_BASE}/lobinhos?_page=${page}&_limit=${limit}${extraParams}`;
    
    const res = await fetch(url);

    if (!res.ok) throw new Error('Erro ao buscar lobinhos');

    const total = res.headers.get("X-Total-Count");
    const data = await res.json();

    return {
        data,
        total: Number(total)
    };
}


// Busca um lobinho específico por ID
export async function getLobinhoById(id) {
    const res = await fetch(`${API_BASE}/lobinhos/${id}`);
    if (!res.ok) throw new Error('Erro ao buscar lobinho');
    return res.json();
}

// Adiciona um novo lobinho
export async function postLobinho(data) {
    const res = await fetch(`${API_BASE}/lobinhos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Erro ao adicionar lobinho');
    return res.json();
}

//Adota um lobinho
export async function patchLobinho(id, data) {
    const res = await fetch(`${API_BASE}/lobinhos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Erro ao atualizar lobinho');
    return res.json();
}
// Deleta um lobinho :(
export async function deleteLobinho(id) {
    const res = await fetch(`${API_BASE}/lobinhos/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Erro ao deletar lobinho');
    return true;
}