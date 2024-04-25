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
      h3Title.textContent = `Informações sobre ${nome}`;
    }
  }
}

function main() {
  updatePageTitleAndHeader();
  fetchPokemonData();
}

window.onload = main;