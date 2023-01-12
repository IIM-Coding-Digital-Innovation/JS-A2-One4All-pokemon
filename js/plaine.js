"use strict"

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function summonPokemon() {
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

function AddPokemonToPc() {
	// for dev only
	let pokemonId = '395'
	let pokemonSellPriceBase = 100
	// for dev only

	let pokemonEl = document.createElement('img')
	pokemonEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

	pokemonEl.addEventListener('click', () => {
		user.balance += pokemonSellPriceBase
		pokemonEl.remove()
		console.log('user balance', user.balance)
	})

	pc.appendChild(pokemonEl)
}

function reloadBall() {
	let unlockedBalls = user.upgrade.balls.filter(ball => ball.unlocked).reverse()
	let ballsArray= []
	unlockedBalls.forEach(ball => {
		for(let i = 0; i < ball.lvl * 5; i++) ballsArray.push(ball)
	})
	console.log(ballsArray)
	
	
	let ballReturn = ballsArray[getRandomInt(99)]
	let ballEl = document.createElement('img')
	ballEl.classList = "ball"
	ballEl.src = ballReturn.sprite
	/* events fired on the draggable target */
	ballEl.addEventListener("drag", (event) => {
		console.log(event);
		ballEl.style.top = `${event.screenX}px`
	});

	ballEl.addEventListener("dragstart", (event) => {
		// store a ref. on the dragged elem
		dragged = event.target;
		// make it half transparent
		event.target.classList.add("dragging");
	});

	ballEl.addEventListener("dragend", (event) => {
		ballEl.style.top = 'auto'
	});
	playground.appendChild(ballEl)
}

const playground = document.querySelector('.playground')
const pc = document.querySelector('.captured__pokemons__ul')
const ball = document.querySelector('.ball')

let user = {
	balance: 0,
	upgrade: {
		balls: [
			{
				name: "PokeBall",
				unlocked: true,
				lvl: 20,
				basePrice: 0,
				sprite: '/assets/images/balls/PokeBall.png'
			},
			{
				name: "SuperBall",
				unlocked: true,
				lvl: 10,
				basePrice: 100,
				sprite: '/assets/images/balls/SuperBall.png'
			},
			{
				name: "HyperBall",
				unlocked: true,
				lvl: 2,
				basePrice: 1000,
				sprite: '/assets/images/balls/HyperBall.png'
			},
		]
	},
	pokemons: []
}

document.querySelector('#playground__captured__toggle').checked = false
document.querySelector('#playground__shop__toggle').checked = false

// for dev only
const addPokemonBtn = document.querySelector('.addPokemonBtn')
addPokemonBtn.addEventListener('click', AddPokemonToPc)

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


let dragged;





summonPokemon()


// QTE

function generateQTE(difficulty) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let result = ''

	let qte = document.createElement('div')
	qte.classList.add('qte')

	for (let i = 0; i < 8; i++) {
		let letter = document.createElement('span')
		letter.classList.add('qte-letter')
		let currentLetter = characters.charAt(Math.floor(Math.random() * characters.length))

		letter.innerText = currentLetter
		qte.appendChild(letter)
		result += currentLetter
	}
	document.querySelector('body').appendChild(qte)

	let timer = 0
	let failsN = 0
	switch (difficulty){
		case 1:
			timer = 5000
			failsN = 5
			break
		case 2:
			timer = 3500
			failsN = 2
			break 
		case 3:
			timer = 2500
			failsN = 0
			break 
	}

	//console.log(result)
	const letters = document.querySelectorAll('.qte-letter')
	let nLetter = 0
	let fails = 0
	window.addEventListener("keydown", e => {
		console.log(e.key.toLowerCase(), result[nLetter].toLowerCase())
		if (e.key.toLowerCase() === result[nLetter].toLowerCase()) {
			console.log('oképourtoi')
			letters[nLetter].style.color = "#3c5aa6"
			nLetter++
			console.log(nLetter, result.length)
		}else{
			fails++
			console.log('non')
		}
		if (nLetter == result.length){
			console.log('bienouèj')
			
			return true
		}else if(fails-1 == failsN){
			console.log('dommagelartiste')
			return false
		}
	});
	setTimeout(()=>{
		document.querySelector('.qte').remove()
		console.log('temps écoulévh')
		return false
	}, timer)
}
//generateQTE(3)
