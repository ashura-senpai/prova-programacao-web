function getEstadoFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('estado');
}

function updatePageTitleAndHeader() {
  const estado = getEstadoFromURL();
  if (estado) {
    document.title = `Página do ${estado}`;
    const h3Title = document.querySelector('#htres');
    if (h3Title) {
      h3Title.textContent = `Informações sobre ${estado}`;
    }
  }
}

function fetchPokemonData() {
  const estado = getEstadoFromURL();
  if (estado) {
    const apiUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}`;
    fetch(apiUrl)
      .then(response => response.json())
      .catch(error => console.error('Erro ao obter imagem do Pokémon:', error));
  }
}

function main() {
  updatePageTitleAndHeader();
  fetchPokemonData();
}

window.onload = main;