function getUfFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('uf');
}

function updatePageTitleAndHeader() {
  const uf = getUfFromURL();
  if (uf) {
    document.title = `Município de ${uf}`;
    const h3Title = document.querySelector('#htres');
    if (h3Title) {
      h3Title.textContent = `${uf}`;
    }
  }
}

function fetchPokemonData() {
  const estado = getEstadoFromURL();
  if (estado) {

    const apiUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}`;
    fetch(apiUrl)

    const pokemonImageSection = document.querySelector('#pokemon-image');
          if (pokemonImageSection) {
            pokemonImageSection.appendChild(pokemonImage);
          }
      .then(response => response.json())
      .catch(error => console.error('Erro ao obter imagem do Pokémon:', error));
  }
}

function main() {
  updatePageTitleAndHeader();
  fetchPokemonData();
}

window.onload = main;