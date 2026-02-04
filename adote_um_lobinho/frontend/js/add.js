import { postLobinho } from './api.js';

const formAdd = document.getElementById('formAdd');
const btnSubmit = formAdd.querySelector('button[type="submit"]');

formAdd.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Desativa o botão evitando cliques duplos
  btnSubmit.disabled = true;
  btnSubmit.innerText = 'Adicionando...';

  const formData = new FormData(formAdd);
  
  // Criação do objeto a ser enviado, garantindo os tipos corretos
  const data = Object.fromEntries(formData);
  
  data.idade = Number(data.idade);
  data.adotado = false;
  data.adotante = null;

  try {
    await postLobinho(data);
    alert('Lobinho adicionado com sucesso!');
    window.location.href = 'homepage.html';
  } catch (err) {
    console.error(err);
    alert('Ops! Erro ao adicionar o lobinho.');
  } finally {
    // Reativa o botão se der erro
    btnSubmit.disabled = false;
    btnSubmit.innerText = 'Adicionar Lobinho';
  }
});