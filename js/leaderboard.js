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
            // let userEl = document.createElement('li')
            users.push(user)
            
        } catch(e) {
            console.log('ERRORRRRRRRRRRRRRRRRRRRRRRRRRR')
        }

        console.log(users)
        let users = users.sort((a, b) => a - b)
    });
})



















let draggableElement = document.getElementsByClassName("ball");

// Ajoutez un écouteur d'événement pour le début de la glissière
draggableElement.addEventListener("mousedown", function(event) {
  // Enregistrez les coordonnées de départ de la souris
    var startX = event.clientX;
    var startY = event.clientY;

  // Ajoutez un écouteur d'événement pour le déplacement de la souris
    document.addEventListener("mousemove", drag);

  // Ajoutez un écouteur d'événement pour la fin de la glissière
    document.addEventListener("mouseup", stopDrag);

  // Définir la fonction de glissière
    function drag(event) {
        // Calculer la distance de déplacement de la souris
        let deltaX = event.clientX - startX;
        let deltaY = event.clientY - startY;

        // Appliquez ces déplacements aux styles de positionnement de l'élément glissant
        draggableElement.style.left = deltaX + "px";
        draggableElement.style.top = deltaY + "px";
    }

  // Définir la fonction pour arrêter la glissière
    function stopDrag() {
    // Supprimez les écouteurs d'événement pour le déplacement de la souris et la fin de la glissière
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  }
});
