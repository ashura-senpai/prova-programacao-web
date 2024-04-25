function getUFFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('uf');
}

function updatePageTitleAndHeader() {
  const uf = getUFFromURL();
  if (uf) {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then(response => response.json())
      .then(data => {
        document.title = `Municípios de ${uf}`;

        const municipiosList = document.querySelector('#municipios-list');
        const municipiosButton = document.querySelector('#municipios-button');
        if (municipiosList) {
          data.forEach(municipio => {
            const li = document.createElement('li');
            li.textContent = municipio.nome;
            municipiosList.appendChild(li);

            const button = document.createElement('button');
            button.textContent = `FAVORITAR`;
            municipiosButton.appendChild(button);
          });
        }
      })
      .catch(error => {
        console.error("Erro ao buscar os municípios:", error);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const estadoLinks = document.querySelectorAll('.estado-link');
  estadoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const estado = e.target.textContent;
      localStorage.setItem('estadoSelecionado', estado);
    });
  });
});

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
