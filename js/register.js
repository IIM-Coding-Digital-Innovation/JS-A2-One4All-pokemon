"use strict"

if(!(localStorage.getItem('username') || localStorage.getItem('username'))) document.querySelector('.log-bg').style.display = "grid"

document.querySelector('.logs .register #register__register').addEventListener('click', () => {
    let username = document.querySelector('#register__username').value
    let password = document.querySelector('#register__password').value

    fetch(`https://api.airtable.com/v0/app1m0A2sG5NrkwN9/tblbumoNEm0DncWNV?filterByFormula=SEARCH("${username}", {username})`, {
        headers: {
            'Authorization': `Bearer keyw099gr1SCsTfU8`
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        if(resp.records.length > 0) {
            document.querySelector('.logs .register .error').textContent = "user already exist"
        } else {
            fetch(`https://api.airtable.com/v0/app1m0A2sG5NrkwN9/tblbumoNEm0DncWNV`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer keyw099gr1SCsTfU8`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fields": {
                        "username": username,
                        "password": password,
                        "data": JSON.stringify({
                            balance: 0,
                            upgrade: {
                                balls: [
                                    {
                                        name: "PokeBall",
                                        lvl: 20,
                                        basePrice: 0,
                                        sprite: '/assets/images/balls/PokeBall.png'
                                    },
                                    {
                                        name: "SuperBall",
                                        lvl: 0,
                                        basePrice: 100,
                                        sprite: '/assets/images/balls/SuperBall.png'
                                    },
                                    {
                                        name: "HyperBall",
                                        lvl: 2,
                                        basePrice: 1000,
                                        sprite: '/assets/images/balls/HyperBall.png'
                                    },
                                ]
                            },
                            pokemons: []
                        })
                    }
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                localStorage.setItem('username', username)
                localStorage.setItem('password', password)
                localStorage.setItem('user', JSON.stringify(resp))
                document.querySelector('.logs .register .error').textContent = "user created"
                setTimeout(() => {
                    document.querySelector('.log-bg').style.display = "none"
                }, 1000)
            })
        }
    })
})

document.querySelector('.logs .login #login__login').addEventListener('click', () => {
    let username = document.querySelector('#login__username').value
    let password = document.querySelector('#login__password').value

    fetch(`https://api.airtable.com/v0/app1m0A2sG5NrkwN9/tblbumoNEm0DncWNV?filterByFormula=AND(SEARCH("${username}", {username}), SEARCH("${password}", {password}))`, {
        headers: {
            'Authorization': `Bearer keyw099gr1SCsTfU8`
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        if(resp.records.length === 0) {
            document.querySelector('.logs .login .error').textContent = "Unknow user"
        } else {
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            localStorage.setItem('user', JSON.stringify(resp.records[0]))
        }
    })
})