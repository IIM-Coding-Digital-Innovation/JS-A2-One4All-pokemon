class Player {
	constructor(data) {
		console.log(data)
		this.id = data.id
		this.createdTime = data.createdTime
		this.fields = data.fields
	}

	updateUser() {
		fetch(`https://api.airtable.com/v0/app1m0A2sG5NrkwN9/tblbumoNEm0DncWNV/${this.id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer keyw099gr1SCsTfU8`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"fields": {
					"username" : this.data.username,
					"password" : this.data.password,
					"data" : JSON.stringify(this.data),
				}
			})
		})
		.then(resp => resp.json())
		.then(resp => {
			this.data = JSON.parse(resp.fields.data)
			localStorage.setItem('user', this)
		})
	}

	addToPc(pokemonId) {
		console.log(this.data)
		this.data.pokemons.pc.push(pokemonId)
		this.updateUser()
		console.log(this.data)
	}
}