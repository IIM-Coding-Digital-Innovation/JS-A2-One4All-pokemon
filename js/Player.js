class Player {
	constructor(data) {
		console.log(data)
		this.id = data.id
		this.createdTime = data.createdTime
		// this.fields = JSON.parse(data.fields)
		this.fields = {}
		this.fields.password = data.fields.password
		this.fields.username = data.fields.username
		console.log(JSON.parse(data.fields.data))
		let a = JSON.parse(data.fields.data)
		this.fields.data = JSON.parse(JSON.stringify(JSON.parse(data.fields.data)))
		console.log("CREATION PLAYER", this)
	}

	setup() {
		this.updatePc()
	}

	fixFields() {
		this.fields.data = JSON.parse(this.fields.data)
	}

	store(){
		localStorage.setItem('user', JSON.stringify({
			id: this.id,
			createdTime: this.createdTime,
			fields: {
				password: this.fields.password,
				username: this.fields.username,
				data: this.fields.data = JSON.stringify(this.fields.data)
			},
		}))
	}

	async updateUser() {
		let response = await fetch(`https://api.airtable.com/v0/app1m0A2sG5NrkwN9/tblbumoNEm0DncWNV/${this.id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer keyw099gr1SCsTfU8`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"fields": {
					"username" : this.fields.username,
					"password" : this.fields.password,
					"data" : JSON.stringify(this.fields.data),
				}
			})
		})
		let data = await response.json()
		// .then(resp => {
		// 	this.fields.data = JSON.parse(resp.fields.data)
		// 	console.log(this)
		// 	this.store()
		// })

		this.fields.data = JSON.parse(data.fields.data)
		console.log(this.fields.data)
		this.store()
	}

	async addToPc(pkmData) {
		console.log(this.fields.data.pokemons.pc)
		this.fields.data.pokemons.pc.push(pkmData.id.toString())

		// ps T'est en train de faire la verif pour le pokedx
		if(!this.fields.data.pokemons.pokedex.find(pkm => pkm.id === pkmData.id.toString())) {
			this.fields.data.pokemons.pokedex.push({id:pkmData.id.toString(),name:pkmData.name,url:pkmData.sprites.front_default})
		}

		await this.updateUser()
		console.log(this)
		this.fixFields()
		console.log(this.fields.data.pokemons.pc)
		this.updatePc()
		this.updatePokedex()
	}

	async sell(pcIndex) {
		this.fields.data.pokemons.pc.splice(pcIndex, 1)
		this.fields.data.balance += 100
		await this.updateUser()
		this.fixFields()
	}
	
	updatePc() {
		while(pc.firstElementChild) pc.firstElementChild.remove()
		this.fields.data.pokemons.pc.forEach((pokemon, index) => {
			let pokemonEl = document.createElement('img')
			pokemonEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`
	
			pokemonEl.addEventListener('click', async () => {
				console.log('user balance')
				await this.sell(index)
				pokemonEl.remove()
			})
			pc.appendChild(pokemonEl)
		});

	}

	updatePokedex() {
		while(pokedex.firstElementChild) pokedex.firstElementChild.remove()
		this.fields.data.pokemons.pokedex.sort((a, b) => parseInt(a.id) - parseInt(b.id))
		this.fields.data.pokemons.pokedex.forEach(pkm => {
			let li = document.createElement('li')
			
			let id = document.createElement('span')
			id.textContent = pkm.id

			let name = document.createElement('span')
			name.textContent = pkm.name

			let pp = document.createElement('img')
			pp.src = pkm.url
			pp.height = 48

			li.appendChild(id)
			li.appendChild(name)
			li.appendChild(pp)

			pokedex.appendChild(li)
		})
	}
}