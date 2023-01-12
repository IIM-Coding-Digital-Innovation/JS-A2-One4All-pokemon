"use strict"

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function summonPokemon () {
  // let pokemon = document.createElement('img')
  // pokemon.src = '/assets/images/placeholders/1.png'

  let pokemon = document.createElement('div')
  pokemon.style.height = '96px'
  pokemon.style.width = '96px'
  pokemon.style.background = 'url(\'/assets/images/placeholders/1.png\')'

  pokemon.classList = 'pokemon'
  pokemon.style.top = `${(getRandomInt(playground.clientHeight - 96) / playground.clientHeight) * 100}%`
  pokemon.style.left = `${(getRandomInt(playground.clientWidth - 96) / playground.clientWidth) * 100}%`

  pokemon.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
  }, false);

  pokemon.addEventListener('drop', () => {
    console.log('pokemon captured')
    pokemon.appendChild(dragged)
  })

  playground.appendChild(pokemon)
}

const playground = document.querySelector('.playground')
let ball = document.querySelector('.ball')

document.querySelector('#playground__captured__toggle').checked = false
document.querySelector('#playground__shop__toggle').checked = false

// ball.addEventListener('drop', () => {
//   console.log('drop ball')
// })

// setInterval(() => {
//   summonPokemon()

// },50)


let dragged;

/* events fired on the draggable target */
ball.addEventListener("drag", (event) => {
  console.log(event);
  ball.style.top = `${event.screenX}px`
});

ball.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.classList.add("dragging");
});

ball.addEventListener("dragend", (event) => {
  ball.style.top = 'auto'
});



summonPokemon()