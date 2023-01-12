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

async function generateQTE(difficulty) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let result = ''

	let qte = document.createElement('div')
	qte.classList.add('qte')
	qte.tabIndex = 0

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
			break 
	}

	//console.log(result)
	const qteInDom=document.querySelector('.qte')
	const letters = document.querySelectorAll('.qte-letter')
	let nLetter = 0
	let fails = 0
	let sLose = 0
	let sWin = 0
	qteInDom.focus()
	qteInDom.addEventListener("keydown", e => {
		if(!letters[nLetter].classList.contains('lose')){
			//console.log(e.key.toLowerCase(), result[nLetter].toLowerCase())
			if (e.key.toLowerCase() === result[nLetter].toLowerCase()) {
				//console.log('oképourtoi')
				letters[nLetter].style.color = "#3c5aa6"
				letters[nLetter].classList.remove('wrong')
				nLetter++
				//console.log(nLetter, result.length)
			}else{
				
				letters[nLetter].classList.add('wrong')
				fails++
				//console.log('non')
			}
			if (nLetter == result.length){
				//console.log('bienouèj')
				sWin = new Date().getTime() / 1000
				
			}else if(fails-1 == failsN){
				//console.log('dommagelartiste')
				letters[nLetter].classList.remove('wrong')
				letters.forEach(l=>{
					l.classList.add("lose")
				})
				sLose = new Date().getTime() / 1000
			}
		}

	});
	return new Promise(resolve =>{
		setTimeout(()=>{
			document.querySelector('.qte').remove()
			//console.log('temps écoulé')
			resolve([new Date().getTime() / 1000, sLose, sWin])
		}, timer)
	})

}

async function resultsQTE(diff){
	const cs = await generateQTE(diff)
	//console.log('----------------------------------------------------------------')
	console.log(cs)
	//console.log('----------------------------------------------------------------')
	if(cs[1] != 0 || cs[2] == 0 || cs[2] > cs[0]){
		console.log('LOSE')
		return false
	}else{
		console.log('WIN')
		return true
	}
}

resultsQTE(1)

