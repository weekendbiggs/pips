const wood = {
    name: "Wood",
    fuelCount: 5
}

const coal = {
    name: "Coal",
    fuelCount: 20
}

const oil = {
    name: "Oil",
    fuelCount: 100
}

const diesel = {
    name: "Diesel",
    fuelCount: 400
}

const gas = {
    name: "Natural Gas",
    fuelCount: 1000
}

const hydrogen = {
    name: "Hydrogen",
    fuelCount: 2600
}

let currentFuelType = wood;

let pellets = 0;
let money = 0;
let tickSpeed = 1000;

const pips = [];

class Pip {
    constructor(id, level, fuel, burnRate, genRate, isEmpty) {
        this.id = id;
        this.level = 1;
        this.fuel = 0;
        this.burnRate = 1;
        this.genRate = 1;
    }
    helloPip() {
        console.log('Hi, I\'m a Pip! I am Pip #' + this.id + '.', 'There are', pips.length, 'other Pips besides me.');
    }
}
var nextId = 1;

function pipBuilder() {
    let p = new Pip(nextId++);
    p.helloPip();
    pips.push(p)
}

function pipUi() {

    // Create pip div
    let pipDiv = document.createElement("div");
    pipDiv.className = 'pip';
    pipDiv.setAttribute('data-pip', pips.length);

    // Create pip name element
    let pipName = document.createElement("span");
    pipName.innerHTML = ('Pip ' + pips.length)

    // Create fuel meter
    let pipMeter = document.createElement("meter");
    pipMeter.setAttribute('data-pip-meter', pips.length);
    pipMeter.setAttribute('value', '0');
    pipMeter.setAttribute('min', '0');

    // Create add fuel button
    let pipAddFuelButton = document.createElement("button");
    pipAddFuelButton.className = 'fuel-btn';
    pipAddFuelButton.setAttribute('data-pip-button', pips.length);
    pipAddFuelButton.innerHTML = ('Add Fuel')

    //Append all of the created elements to the parent div
    pipDiv.appendChild(pipName);
    pipDiv.appendChild(pipMeter);
    pipDiv.appendChild(pipAddFuelButton);

    document.getElementById("pips").appendChild(pipDiv);
};

document.addEventListener('click', function(event) {
    if (event.target.matches('#add-pip')) {
        pipBuilder();
        pipUi();
    }
});

document.addEventListener('click', function(event) {
    if (event.target.matches('.fuel-btn')) {
        let dataPipNumber = event.target.getAttribute('data-pip-button');
        let dataPip = pips.find(obj => obj.id == dataPipNumber);
        if (dataPip.fuel == 0) {
            dataPip.fuel = currentFuelType.fuelCount;
            updatePipMeter(dataPip, dataPipNumber);
        }
    }

});

function updatePipMeter(dataPip, dataPipNumber) {
    let pipMeter = document.querySelector("[data-pip-meter=" + CSS.escape(dataPipNumber) + "]");
    pipMeter.setAttribute('value', dataPip.fuel);
    pipMeter.setAttribute('max', currentFuelType.fuelCount);
}

function updateStats() {
    let pelletCounter = document.querySelector("#pellets");
    let moneyCounter = document.querySelector("#money");
    pelletCounter.innerHTML = pellets;
    moneyCounter.innerHTML = money;
}


function generate() {
    pips.forEach(function(pipItem) {
        if (pipItem.fuel > 0) {
            pipItem.fuel = pipItem.fuel - pipItem.burnRate;
            pellets = pellets + pipItem.genRate;
            updatePipMeter(pipItem, pipItem.id);
            updateStats();
        }
    });
};

window.setInterval(function() {
    generate();
}, tickSpeed);

