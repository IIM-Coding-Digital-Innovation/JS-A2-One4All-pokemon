let url = "https://pokeapi.co/api/v2/pokemon?limit=151"

async function getPokemon(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function printPokemon() {
    const response = await fetch(url)
    const data = await response.json()
    const pokemons = data.results
    let html = ''
    await Promise.all(pokemons.map(async function(pokemon) {
        const url = pokemon.url
        const pokeData = await getPokemon(url)
        html +=
            `
            <div class="card">
            <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
                <h2>${pokeData.name}</h2>
                <span>${pokeData.height}</span>
                <span>${pokeData.weight}</span>
                <div>${pokeData.types[0].type.name}</div>
            </div>
            `
    }))
    document.getElementById('pokemonCard').innerHTML = html
}

// printPokemon()