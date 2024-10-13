
const pancakeBase = document.querySelector('#type'); // später variable überschreiben je nach auswahl // option is attribute of type.
const checkbox = document.querySelectorAll('input');
const output = document.querySelectorAll('#totalPrice');
// console.log(checkbox);
let totalPrice; // wird das jedesmal mit 0 überschrieben?

priceFunction(); // i put that because it should invoke automatically by not changing the input field, so that it takes the 5€ by defalut to the total price.

function customizeBase() {

    totalPrice += parseInt(pancakeBase.value);// convert string to a number
    // console.log(totalPrice); Das dropdown hat options und selectedIndex (sagt welcher selected ist, und davon kann man den text nehmen) // loop war nicht nötig

}

function checkBoxCheck() {
    for (let index = 0; index < checkbox.length; index++) {
        const element = checkbox[index];  // nimmt den checkbox wert und tut es in die Element variable
        if (element.checked === true) {
            totalPrice += parseInt(element.value); // convert string to a number
        }
    }
}

function priceDisplay() {

    output[0].textContent = '$' + totalPrice;
    output[1].textContent = '$' + totalPrice;
    // output[2].textContent = '$' + totalPrice;
    textGlowEffect()
}

function textGlowEffect() {
    const element = document.querySelector('#totalPrice');

    element.className = 'textGlow';
    setTimeout(() => {
        element.className = '';
    }, 1000);
};

function priceFunction() {
    totalPrice = 0; // damit nicht einfach nur addiert wird, sonst würde bei jedem Klick der Preis erhöht, auch wenn man haken wegnimmt
    customizeBase();
    checkBoxCheck();
    priceDisplay();
    //  console.log(totalPrice);
}

pancakeBase.addEventListener('change', priceFunction); // event listener für das dropdown menü - löst preis fkt aus weil sich Preis ändern muss.

for (let index = 0; index < checkbox.length; index++) {
    const element = checkbox[index];

    element.addEventListener('change', priceFunction); // für jede Checkbox ein Event li, damit sich der Preis jedes mal ändern kann - deswegen ändert sich der Preis auch wieder zurück wenn man einen haken wegmacht
}

const text = document.getElementById('content');

function textUpdate() {
    text.textContent = 'Hello ' + document.querySelector('#name').value;
}
// you can use the attribute selector also after the brackets: const pancakeBase = document.querySelector('#type').value;   CRAZY! :)

const orderName = document.getElementById('orderName');
const orderBase = document.getElementById('orderBase');
const orderTopp = document.getElementById('orderTopp');
const orderExtra = document.getElementById('orderExtra');
const orderDelivery = document.getElementById('orderDelivery');
const orderPrice = document.getElementById('orderPrice');

function displayOrder() {
    orderName.textContent = 'Your Name: ' + document.querySelector('#name').value;
    orderBase.textContent = 'Pancake type: ' + pancakeBase.options[pancakeBase.selectedIndex].text.split(' ')[0]; // to get rid of the $ part - alle optionen anschauen, welche ist die ausgewählte und dann den text von der benutzen. selectedIndex ist als attribut verfügbar
    let toppings = 'Selected Toppings: ';
    let toppingArray = [];
    for (let index = 0; index < 3; index++) { // achtung bei Änderungen (oder neuen Event listener für die radio buttons machen)
        const element = checkbox[index];

        if (element.checked === true) {
            toppings += element.name + ', '; // eigentlich text benutzen der auf dem Screen ist
            toppingArray.push(element.name); // für array
        }
    }
    let extras = 'Selected Extras: ';
    let extrasArray = [];
    for (let index = 3; index < 5; index++) { // achtung bei Änderungen (oder neuen Event listener für die radio buttons machen)
        const element = checkbox[index];

        if (element.checked === true) {
            extras += element.name + ', '; // eigentlich text benutzen der auf dem Screen ist
            extrasArray.push(element.name); // für array
        }
    }
    let delivery = 'Selected delivery method: ';
    let deliveryOpt = '';
    for (let index = 6; index < 9; index++) {
        const element = checkbox[index];

        if (element.checked === true) {
            if (element.id == "eatin") {
                delivery += "Eat in";
                deliveryOpt = "Eat in"; // für array
            }
            if (element.id == "pickup") {
                delivery += "Pickup";
                deliveryOpt = "Pickup"; // für array
            }
            if (element.id == "delivery") {
                delivery += "Delivery";
                deliveryOpt = "Delivery"; // für array
            }
        }
    }
    orderTopp.textContent = toppings.slice(0, -2);
    orderExtra.textContent = extras.slice(0, -2);
    orderDelivery.textContent = delivery;
    orderPrice.textContent = `Total Price: $${totalPrice}`;

    // save the order to the array

    const orderDetails = [];
    // inside the jeweilige function:
    // orderDetails.push += orderName, pancakeBase orderTopp, orderExtra, orderDelivery, totalPrice;
    class Pancake {
        constructor(name, base, toppings, extras, delivery, price) {
            this.name = name;
            this.base = base;
            this.toppings = toppings;
            this.extras = extras;
            this.delivery = delivery;
            this.price = price;
        }
    }

    let pancakes = new Pancake(document.querySelector('#name').value, pancakeBase.options[pancakeBase.selectedIndex].text.split(' ')[0], toppingArray, extrasArray, deliveryOpt, totalPrice);

    let nameListe = false; // alte Bestellungen updaten
    for (let i = 0; i < orderDetails.length; i++) {
        if (pancakes.name == orderDetails[i].name) {
            orderDetails[i] = pancakes;
            nameListe = true; // name in Liste gefunden? wenn ja, nicht hinten angehängt 
        }
    }
    if (nameListe == false) { // wenn false, dann wird der pancake hinten angehängt
        orderDetails.push(pancakes);
    }
    console.log(orderDetails);
}


function scrollButton() {
    const element = document.getElementById('container').offsetTop;
    window.scrollTo({ top: element, behavior: 'smooth' });
}

const modalButton = document.querySelector('.detailsButton');
const closeButton = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

const toggleModal = () => {
    overlay.classList.toggle('visible');
}

modalButton.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal)