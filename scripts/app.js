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
    constructor(id, level, fuel, burnRate, genRate, isEmpty, pipPellets) {
        this.id = id;
        this.level = 1;
        this.fuel = 0;
        this.burnRate = 1;
        this.genRate = 1;
        this.pipPellets = 0;
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
    let pipImg = document.createElement("img");
    pipImg.setAttribute('src', 'graphics/cube-0.png');
    pipImg.setAttribute('data-pip-img', pips.length);

    // Create fuel meter
    let pipMeter = document.createElement("meter");
    pipMeter.setAttribute('data-pip-meter', pips.length);
    pipMeter.setAttribute('value', '0');
    pipMeter.setAttribute('min', '0');

    // Create feed pip button
    let pipAddFuelButton = document.createElement("button");
    pipAddFuelButton.className = 'feed-btn';
    pipAddFuelButton.setAttribute('data-feed-pip', pips.length);
    pipAddFuelButton.innerHTML = ('Feed Pip');

    // Create take pellets button
    let pipTakePelletsButton = document.createElement("button");
    pipTakePelletsButton.className = 'pellets-btn';
    pipTakePelletsButton.setAttribute('data-take-pellets', pips.length);
    pipTakePelletsButton.innerHTML = ('Take Pellets');
    pipTakePelletsButton.classList.add('hide');

    //Append all of the created elements to the parent div
    pipDiv.appendChild(pipAddFuelButton);
    pipDiv.appendChild(pipTakePelletsButton);
    pipDiv.appendChild(pipImg);
    pipDiv.appendChild(pipMeter);

    document.getElementById("pips").appendChild(pipDiv);
};

document.addEventListener('click', function(event) {
    if (event.target.matches('#add-pip')) {
        pipBuilder();
        pipUi();
    }
});

document.addEventListener('click', function(event) {
    if (event.target.matches('.feed-btn')) {
        let dataPipNumber = event.target.getAttribute('data-feed-pip');
        let dataPip = pips.find(obj => obj.id == dataPipNumber);
        if (dataPip.fuel == 0) {
            dataPip.fuel = currentFuelType.fuelCount;
            event.target.classList.add('hide');
            let pipImg = document.querySelector("[data-pip-img=" + CSS.escape(dataPipNumber) + "]");
            pipImg.setAttribute('src', 'graphics/cube-0-wood.png');
            updatePipMeter(dataPip, dataPipNumber);
        }
    }

});

document.addEventListener('click', function(event) {
    if (event.target.matches('.pellets-btn')) {
        let dataPipNumber = event.target.getAttribute('data-take-pellets');
        let dataPip = pips.find(obj => obj.id == dataPipNumber);
        pellets = pellets + dataPip.pipPellets;
        dataPip.pipPellets = 0;
        event.target.classList.add('hide');
        let pipAddFuelButton = document.querySelector("[data-feed-pip=" + CSS.escape(dataPipNumber) + "]");
        pipAddFuelButton.classList.remove('hide');
        updateStats();
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
    let currentFuel = document.querySelector("#fuel");
    currentFuel.innerHTML = currentFuelType.name;
    pelletCounter.innerHTML = pellets;
    moneyCounter.innerHTML = money;
}


function generate() {
    pips.forEach(function(pipItem) {
        if (pipItem.fuel > 0) {
            pipItem.fuel = pipItem.fuel - pipItem.burnRate;
            pipItem.pipPellets = pipItem.pipPellets + pipItem.genRate;
            updatePipMeter(pipItem, pipItem.id);
        } else if (pipItem.pipPellets == currentFuelType.fuelCount) {
            let dataPipNumber = pipItem.id;
            let pipTakePelletsButton = document.querySelector("[data-take-pellets=" + CSS.escape(dataPipNumber) + "]");
            let pipAddFuelButton = document.querySelector("[data-feed-pip=" + CSS.escape(dataPipNumber) + "]");
            pipTakePelletsButton.classList.remove('hide');
            let pipImg = document.querySelector("[data-pip-img=" + CSS.escape(dataPipNumber) + "]");
            pipImg.setAttribute('src', 'graphics/cube-0.png');
        }
    });
};

window.setInterval(function() {
    generate();
}, tickSpeed);

    updateStats();




