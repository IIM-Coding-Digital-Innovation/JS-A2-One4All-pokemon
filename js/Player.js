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
			this.fields = JSON.parse(resp.fields.data)
			console.log(this)
			this.store()
		})
	}

	addToPc(pokemonId) {
		console.log(this.data)
		this.data.pokemons.pc.push(pokemonId)
		this.updateUser()
		console.log(this.data)
	}
}