const addCarForm = document.querySelector('#inputForm');
const searchCarForm = document.querySelector('#search'); // for reset the form

let allCars = [];

class Car {
    constructor(licencePlate, maker, model, currentOwner, price, discountedPrice, color, year) {
        this.licencePlate = licencePlate;
        this.maker = maker;
        this.model = model;
        this.currentOwner = currentOwner;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.color = color;
        this.year = year;
    }
}

function getInput() {

    let discountedPrice = 'No discount';

    let carInput = new Car(document.querySelector('#licensePl').value,
        document.querySelector('#maker').value,
        document.querySelector('#model').value,
        document.querySelector('#currOwner').value,
        document.querySelector('#price').value,
        discountedPrice,
        document.querySelector('#color').value,
        document.querySelector('#year').value
    );

    if (carInput.year <= 2014) {
        carInput.discountedPrice = Math.round(carInput.price * 0.85 * 100) / 100; // it is older and gets discount 
        // erst wird 100 multipliziert, dann passiert round (auf ganze Zahl) dann /100 macht wieder kommastellen
    }

    try { // doesn't get new Input values and just adds the first sotred variables inside the array and table

        if (carInput.price < 0 || isNaN(carInput.price)) {

            throw new Error('Please enter the correct price'); // hat es immer eingetragen, auch wenn nummer negativ war. Weil die main function beide funktionen durchlaufen lässt und nicht den Eintrag in die Tabelle stoppt - fixed mit if in main function und retunr different values
        }
        if (carInput.year < 1886 || carInput.year > 2024 || isNaN(carInput.year)) {
            throw new Error('Please use a year between 1886 and 2024');
        }

        if (carInput.licencePlate == '') {
            throw new Error('Please enter License Plate');
        }
        for (let i = 0; i < carInput.licencePlate.length; i++) { // iterates through li Pl and defines only num and letters are allowed
            if (!((carInput.licencePlate[i] >= 'a' && carInput.licencePlate[i] <= 'z') || (carInput.licencePlate[i] >= 'A' && carInput.licencePlate[i] <= 'Z') || (carInput.licencePlate[i] >= '0' && carInput.licencePlate[i] <= '9'))) {
                throw new Error('Please enter only numbers and letters');
            }
        }

        const index = allCars.findIndex((car) => car.licencePlate == carInput.licencePlate);
        if (index > -1) { // wenn findIndex erfolgreich, dann index wenn nicht dann -1
            throw new Error('License Plate already in Database');
        }
        if (carInput.maker == '') {
            throw new Error('Please enter the Maker');
        }
        if (carInput.model == '') {
            throw new Error('Please enter the Model');
        }
        if (carInput.owner == '') {
            throw new Error('Please enter the current owner');
        }
        if (carInput.color == '') {
            throw new Error('Please enter the color'); // wie error constructor, der dann fehler weiter schmeißt
        }

    }
    catch (error) { // fängt den error und hat dann den mit allen attributen
        displayMessage(error.message, 'error');
        return 0;
    }

    allCars.push(carInput);
    localStorage.setItem('allCars', JSON.stringify(allCars)); // only strings allowed in local storage -> JSON.stringify - setItem saves it into storage

    displayCar(carInput);
    displayMessage('Car added successfully', 'success');
    resetForm();
}

const loadCarsFromLocalStorage = () => {
    const storedCars = localStorage.getItem('allCars'); // restore items from the local storage
    if (storedCars) {
        const parsedCars = JSON.parse(storedCars); // to turn it into an object again
        parsedCars.forEach(carData => {
            allCars.push(new Car(carData.licencePlate, carData.maker, carData.model, carData.currentOwner, carData.price, carData.discountedPrice, carData.color, carData.year)); /* JSON.parse(storedCars): Wandelt den JSON-String in ein Array von Objekten um. Diese Objekte sind aber keine Car-Objekte, sondern nur normale, einfache JavaScript-Objekte mit Eigenschaften wie license, maker, model usw.
            Du brauchst aber Instanzen der Car-Klasse, um auf Methoden und Eigenschaften der Klasse Car zugreifen zu können. */
        });

        allCars.forEach(car => displayCar(car));
    }
};

function displayCar(car) { // how to prevent the reload of the table or show the rest of the array there

    let table = document.querySelector('#carsTable');
    /* add a row to the table and display the content in the correct cells */

    let row = table.insertRow();
    let cell1 = row.insertCell();
    cell1.textContent = car.licencePlate;

    let cell2 = row.insertCell();
    cell2.textContent = car.maker;

    let cell3 = row.insertCell();
    cell3.textContent = car.model;

    let cell4 = row.insertCell();
    cell4.textContent = car.currentOwner;

    let cell5 = row.insertCell();
    cell5.textContent = car.price;

    let cell6 = row.insertCell();
    cell6.textContent = car.discountedPrice;

    let cell7 = row.insertCell();
    cell7.textContent = car.color;

    let cell8 = row.insertCell();
    cell8.textContent = car.year;

    let cell9 = row.insertCell(); // hängt einen button an die Zeile an
    let button = document.createElement('BUTTON');
    let t = document.createTextNode('Delete'); //Creates a new Text node. This method can be used to escape (erlaubt auch Sonderzeichen, die nicht HTML interpretiert werden) HTML characters. 
    button.setAttribute('class', 'deleteBtn')
    button.appendChild(t); // fügt den Textknoten (Text: "Delete") zum Button-Element dazu
    cell9.appendChild(button);

    const actualLicensePl = car.licencePlate; // index beim löschen war immer falsch und war immer nur das letzte Element
    button.addEventListener('click', () => deleteCar(actualLicensePl)); //triggert delete car funktion

}


function deleteCar(licencePlate) { // index = table.rows.length                 // array: löscht den letzten Eintrag ?? check! 
    const table = document.querySelector('#carsTable');
    const index = allCars.findIndex((car) => car.licencePlate == licencePlate); // Table: letzte row wird nicht gelöscht

    table.deleteRow(index + 1); // löscht das Auto aus der Tabelle
    allCars.splice(index, 1); // +2 ist korrekt! sonst löscht es andere Dinge // edit: +2 war korrekt, jetzt ist +1 gut.


    /* allCars.splice(index + 1, 1); */ // löscht das auto aus dem Cars array
    localStorage.setItem('allCars', JSON.stringify(allCars)); // overwrites the arr in local storage

    displayMessage('Car deleted successfully', 'success');
    console.log(allCars);

    /* 
    alternative: 
    const deleteCar = (index) => {
    cars.splice(index, 1);
    localStorage.setItem('cars', JSON.stringify(cars));
    displayTable();
    displayMessage("Car deleted successfully!");
};
    */
}// table shows only the last after refreshing
// rather refresh the whole table than delete one thing.

function resetForm() {
    document.querySelector('#licensePl').value = '';
    document.querySelector('#maker').value = '';
    document.querySelector('#model').value = '';
    document.querySelector('#currOwner').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#color').value = '';
    document.querySelector('#year').value = '';
}

function getInputPlate() {

    const searchPlate = document.querySelector('#searchLicense').value;

    try {
        if (searchPlate == '') {
            throw new Error('Please enter a License Plate');
        }
        for (let i = 0; i < searchPlate.length; i++) { // iterates through li Pl and defines only num and letters are allowed
            if (!((searchPlate[i] >= 'a' && searchPlate[i] <= 'z') || (searchPlate[i] >= 'A' && searchPlate[i] <= 'Z') || (searchPlate[i] >= '0' && searchPlate[i] <= '9'))) {
                throw new Error('Please enter only numbers and letters');
            }
        }
    } catch (error) {
        displayMessage(error.message, 'error');
        return 0;
    }

    const index = allCars.findIndex((car) => car.licencePlate == searchPlate);
    console.log(`Index from getInputfunction ${index}`);
    if (index >= 0) { // wenn er eins gefunden hat(kann ja auch 0 sein)
        if (allCars[index].year <= 2014) { // schreibt es hin, altes oder neues
            document.querySelector('#showSearch').textContent = `Maker: ${allCars[index].maker}`
            document.querySelector('#showModel').textContent = `Model: ${allCars[index].model}`
            document.querySelector('#showOwner').textContent = `Owner: ${allCars[index].currentOwner}`
            document.querySelector('#showPrice').textContent = `Price: ${allCars[index].price}€`
            document.querySelector('#showDiscPrice').textContent = `Discounted Price: ${allCars[index].discountedPrice}€`;
        }
        else {
            document.querySelector('#showSearch').textContent = `Maker: ${allCars[index].maker}`
            document.querySelector('#showModel').textContent = `Model: ${allCars[index].model}`
            document.querySelector('#showOwner').textContent = `Owner: ${allCars[index].currentOwner}`
            document.querySelector('#showPrice').textContent = `Price: ${allCars[index].price}€`
            document.querySelector('#showDiscPrice').textContent = 'No Discount';
        }
    }
    else {
        document.querySelector('#showSearch').textContent = 'No matching car found.';
        document.querySelector('#showModel').textContent = '';
        document.querySelector('#showOwner').textContent = '';
        document.querySelector('#showPrice').textContent = '';
        document.querySelector('#showDiscPrice').textContent = '';
    }

    document.querySelector('#searchLicense').value = '';

    const overlay = document.querySelector('#showBox');
    overlay.classList.add('visible'); // adds the box for showing the text
}

function displayMessage(message, type = "success") { // looked from Margits code
    // shows message when called (message = declared as argument of function; type = optional argument with a default value "sucess" for CSS auswahl)
    const messageElement = document.querySelector("#message"); // shows in html document
    messageElement.textContent = message; // takes the value of current message
    messageElement.className = type; // for CSS: type wird definiert
    setTimeout(() => {
        messageElement.textContent = ""; // after 3sec messageEl takes Value empty String and empty class and turns on the default CSS value "hidden" 
        messageElement.className = "";
    }, 3000);
}; // put it in every message to call that displayMessage function - to show the message on screen

// displayMessage('Car added successfully', 'success');
// displayMessage(error.message, 'error');

window.addEventListener('load', loadCarsFromLocalStorage); // why not only just call the function?
/* 
let input = document.getElementById('#submitInfo');

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
}); */