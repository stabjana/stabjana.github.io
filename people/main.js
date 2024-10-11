let persons = [];

class User {
    constructor(id, name, username, email) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}

async function getUserInfo() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json(); // why again await?
        /* console.log(data); */

        data.forEach((person) => { // so nenn ich das array element was grade bearbeitet wird
            persons.push(new User(person.id, person.name, person.username, person.email))
        });
    } catch (error) {
        console.error('Error', error);
    }
    /*  console.log(persons); */

    crateCards();
}
getUserInfo();


function crateCards() {
    const container = document.getElementById('card-container');
    console.log(persons);

    persons.forEach(person => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
         <img src="https://robohash.org/${person.id}.png?set=set4">
        <h3>${person.username}</h3>
        <p>${person.name}</p>
        <p>${person.email}</p>
        `
        /* console.log(card); */
        container.appendChild(card);
        /* Erzeug connection zu div, erzeug class für div, änder den Inhalt
        IMG: Anleitung in der Website, URL + die person id + das Katzenset */
    })
}