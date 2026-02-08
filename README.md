# Adote um Lobinho

Este projeto consiste em uma aplicação web para a gestão e adoção de lobinhos, desenvolvida para transformar uma interface estática em uma experiência dinâmica integrada a uma API REST. A aplicação permite o gerenciamento completo (CRUD) dos animais, utilizando as melhores práticas de desenvolvimento front-end.

## Tecnologias e Ferramentas

- **Front-end:** HTML5, CSS3 e JavaScript (ES6+).
- **Comunicação:** API Fetch com suporte a `async/await` para operações assíncronas.
- **Backend Simulado:** `json-server` para persistência de dados em arquivo JSON.
- **Design:** Fidelidade ao protótipo do Figma.

---

## Configuração do Ambiente

Para executar o projeto localmente, siga os passos abaixo:

1. **Instalação de Dependências:**
   npm install

2. **Inicialização da API:**
   npm run start:api

O servidor rodará em http://localhost:3000/lobinhos.

---

## Funcionalidades Implementadas

1. Listagem e Filtros (Home)
   Paginação: Consumo otimizado da API limitando a 4 registros por página.

Busca Dinâmica: Filtro por nome utilizando o parâmetro nome_like da API.

Filtro de Status: Filtro específico para visualizar apenas animais já adotados.

2. Gestão de Animais
   Cadastro (POST): Formulário completo para inclusão de novos lobinhos.

Visualização Detalhada: Recuperação de dados específicos via ID na URL.

Exclusão (DELETE): Remoção definitiva de registros com tratamento de confirmação e redirecionamento automático para a lista.

3. Processo de Adoção (PATCH)
   Atualização Parcial: Implementação de PATCH para manter a integridade dos dados originais do animal.

Estrutura de Dados: Registro do adotante seguindo o esquema de objeto aninhado (adotante: { nome, idade, email }) exigido pelo projeto.

## Decisões de Engenharia e Qualidade

Tratamento de Concorrência: Uso de e.preventDefault() e setTimeout para gerenciar redirecionamentos pós-requisição, evitando conflitos com o ciclo de vida do navegador.

Consistência de Dados: Validação de tipos (como parseInt para idades) e garantia de payloads alinhados estritamente com a documentação do PDF.

UX & Responsividade: Implementação de Media Queries para assegurar a usabilidade em dispositivos móveis e animações de hover nos elementos de navegação.

Integração de Mapa: Inclusão de iFrame com a localização da sede (UFF) no rodapé.

## Estrutura de Endpoints (API)

GET /lobinhos?\_page=1&\_limit=4: Listagem paginada.

POST /lobinhos: Criação de registro.

PATCH /lobinhos/:id: Atualização de status de adoção.

DELETE /lobinhos/:id: Remoção de registro.

## Desenvolvedores

Esta aplicação foi desenvolvida por:

- [Athos Pozo](https://github.com/athospozo)
- [Lucas Duarte Barbosa](https://github.com/LucasArrais)
- [Pedro Lucas Motta](https://github.com/PL7dev)
- [Yago Santos Gois](https://github.com/YAGO-SG)
