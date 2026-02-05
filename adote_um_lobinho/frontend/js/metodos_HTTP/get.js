// funcao para buscar todos os lobinho (nao acho que precisrá ser utilizada)
async function buscarLobinhos () {
    try {
        const response = await fetch('http://localhost:3000/lobinhos');

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json();
        console.log(`Lobinhos encontrados:`, lobinhos);

        return lobinhos;
    }
    catch (error) {
        console.log(`Erro ao buscar lobinhos: `, error);
        throw error;
    }
}

// funcao para paginacao (acredito que usaremos esta para fazer a lista de lobos)
//os query params podem ser modificados para fazer buscas especificas
async function buscarLobinhosPaginados (pagina = 3, limite = 4) {
    try{
        const response = await fetch (`http://localhost:3000/lobinhos?_page=${pagina}&_limit=${limite}`);

        if (!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json();

        //numero total de lobos no headeer:
        const totalItens = response.headers.get('X-Total-Count');

        console.log(`Pagina ${pagina} (${limite} por página)`, lobinhos);
        console.log(`Total de lobinhos: ${totalItens}`);

        return {
            dados: lobinhos,
            pagina,
            limite,
            total: parseInt(totalItens),
            totalPaginas: Math.ceil(parseInt(totalItens)/limite)
        };
    }
    catch (error) {
        console.log(`Erro ao buscar bolinhos paginados: `, error);
        throw error;
    }
}

buscarLobinhosPaginados ()