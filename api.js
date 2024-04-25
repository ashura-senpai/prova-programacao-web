function getNomeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('nome');
}

function updatePageTitleAndHeader() {
  const nome = getNomeFromURL();
  if (nome) {
    document.title = `Página do ${nome}`;
    const h3Title = document.querySelector('#htres');
    if (h3Title) {
      h3Title.textContent = `${nome}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const favForm = document.getElementById('favorito-form');
  const favList = document.getElementById('todo-list');

  function loadTodoList() {
    const favs = JSON.parse(localStorage.getItem('favs')) || [];
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
    if (favForm) {
      const favs = JSON.parse(localStorage.getItem('favs')) || [];
      favs.push(favForm);
      localStorage.setItem('favs', JSON.stringify(favs));
      loadTodoList();
    }
  });
});

function main() {
  updatePageTitleAndHeader();
  fetchPokemonData();
}

window.onload = main;