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


async function printRandomPokemon() {
    const randomNum = Math.floor(Math.random() * 151) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNum}`
    const pokeData = await getPokemon(url)
    const randomPokemon = document.getElementById("randomPokemon");

    //data to print 
    randomPokemon.innerHTML = pokeData.name;
    document.getElementById("randomPokemonImg").src = pokeData.sprites.front_default;

    //random position
    document.getElementById("divrandomPokemon").style.position = "absolute";
    document.getElementById("divrandomPokemon").style.left = Math.floor(Math.random() * (window.innerWidth - document.getElementById("divrandomPokemon").clientWidth)) + 'px';
    document.getElementById("divrandomPokemon").style.top = Math.floor(Math.random() * (window.innerHeight - document.getElementById("divrandomPokemon").clientHeight)) + 'px';
}

document.querySelector('.btprintrandompokeonwindow').addEventListener('click', printRandomPokemon);
