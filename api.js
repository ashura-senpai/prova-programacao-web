function getEstadoFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('estado');
}

function updatePageTitleAndHeader() {
  const uf = getEstadoFromURL();
  if (uf) {
    document.title = `Página do ${uf}`;
    const h3Title = document.querySelector('#htres');
    if (h3Title) {
      h3Title.textContent = `Informações sobre ${uf}`;
    }
  }
} 

function main() {
  updatePageTitleAndHeader();
  fetchPokemonData();
}

window.onload = main;