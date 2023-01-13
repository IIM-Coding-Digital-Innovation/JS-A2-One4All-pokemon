fetch(`https://api.airtable.com/v0/app1m0A2sG5NrkwN9/tblbumoNEm0DncWNV`, {
    headers: {
        'Authorization': `Bearer keyw099gr1SCsTfU8`
    }
})
.then(resp => resp.json())
.then(resp => {
    console.log(resp.records)
    let users = []
    resp.records.forEach(record => {
        let user = {}
        console.log(record.fields.username)
        try {
            user.name = record.fields.username
            user.data = JSON.parse(record.fields.data)
        } catch(e) {
            console.log('ERRORRRRRRRRRRRRRRRRRRRRRRRRRR')
        }
    });
})