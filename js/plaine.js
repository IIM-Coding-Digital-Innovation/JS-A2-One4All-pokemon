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
