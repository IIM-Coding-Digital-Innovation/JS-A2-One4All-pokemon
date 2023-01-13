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
                <span>${pokeData.id}</span>
                <h2>${pokeData.name}</h2>
                <span>Height ${pokeData.height}</span>
                <span>Weight ${pokeData.weight}</span>
                <div>${pokeData.types[0].type.name}</div>
            </div>
            `
    }))
    document.getElementById('pokemonCard').innerHTML = html
}

printPokemon()

async function printRandomPokemon() {
    const randomNum = Math.floor(Math.random() * 151) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNum}`
    const pokeData = await getPokemon(url);
    const randomPokemon = document.getElementById("randomPokemon");

    // Create new div foreach Pokemon
    const newPokemon = document.createElement('div');
    newPokemon.classList.add("pokemon-card");
    randomPokemon.appendChild(newPokemon);

    let shiny;
    // Add image 
    const pokemonImg = document.createElement('img');
    if (Math.random() < 0.2) {
        pokemonImg.src = pokeData.sprites.front_shiny;
        shiny = true
    }
    else{
        pokemonImg.src = pokeData.sprites.front_default;
        shiny = false
    }
    newPokemon.appendChild(pokemonImg);

    // Add name to div
    const pokemonName = document.createElement('h2');
    if (shiny) {
        pokemonName.innerHTML = pokeData.name + " (Shiny)";
    }
    else{
        pokemonName.innerHTML = pokeData.name;
    }
    newPokemon.appendChild(pokemonName);


    //random position
    newPokemon.style.position = "absolute";
    newPokemon.style.left = Math.floor(Math.random() * (window.innerWidth - newPokemon.clientWidth)) + 'px';
    newPokemon.style.top = Math.floor(Math.random() * (window.innerHeight - newPokemon.clientHeight)) + 'px';
}
document.querySelector('.btprintrandompokeonwindow').addEventListener('click', printRandomPokemon);