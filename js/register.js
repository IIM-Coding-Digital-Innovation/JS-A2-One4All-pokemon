let xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.airtable.com/v0/appqUbA06fCsvR9Gy/tblSj2eKlJpC77307', true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer keyw099gr1SCsTfU8');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let json = JSON.parse(xhr.responseText);
        console.log(json.email + ", " + json.password)
    }
};

document.querySelector('#registerBTN').addEventListener('click', ()=>{
    let Username = document.querySelector('#username').value
    let Email = document.querySelector('#email').value
    let Password = document.querySelector('#password').value
    if( !Username.replace(/\s+/, '').length ||
        !Email.replace(/\s+/, '').length ||
        !Password.replace(/\s+/, '').length){
        alert( "Un champ est vide!" )
    }else{
        let data = JSON.stringify({
            "fields": {
                    "Name": Username,
                    "Email":Email,
                    "Password": Password
            }
        });
        xhr.send(data);
    }
})
