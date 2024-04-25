function getUFFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('uf');
}

function updatePageTitleAndHeader() {
  const uf = getUFFromURL();
  if (uf) {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`)
      .then(response => response.json())
      .then(data => {
        const sigla = data.sigla;
        document.title = `MUNICÍPIOS DE ${sigla}`;
        const h4Title = document.querySelector('#htres');
        if (h4Title) {
          h4Title.textContent = `${sigla}`;
        }
      })
      .catch(error => {
        console.error("Erro ao buscar o nome do estado:", error);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const favForm = document.getElementById('favorito-form');
  const favList = document.getElementById('todo-list');

  function loadTodoList() {
    const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    favList.innerHTML = '';
    favs.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo;
      favList.appendChild(li);
    });
  }

  loadTodoList();

  favForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    favs.push(document.title);
    localStorage.setItem('favoritos', JSON.stringify(favs));
    loadTodoList();
  });
});

function main() {
  updatePageTitleAndHeader();
}

window.onload = main;
