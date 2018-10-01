var power = 0;
var money = 0;
var reactor = {
    level: 1,
    fuel: 0,
    maxFuel: 10,
    genRate: 1,
    burnRate: 1,
    tickSpeed: 1000,
    isEmpty: true
}

var wood = {
    name: "Wood",
    fuelCount: 1
}

var coal = {
    name: "Coal",
    fuelCount: 10
}

var oil = {
    name: "Oil",
    fuelCount: 50
}

var diesel = {
    name: "Diesel",
    fuelCount: 200
}

var gas = {
    name: "Natural Gas",
    fuelCount: 500
}

var hydrogen = {
    name: "Hydrogen",
    fuelCount: 1600
}

document.addEventListener('click', function(event) {

    if (event.target.matches('[data-fuel]')) {
        dataFuelType = event.target.getAttribute('data-fuel');
        if (dataFuelType === "wood") {
            addFuel(wood)
        } else if (dataFuelType === "coal") {
            addFuel(coal)
        }
        document.getElementById("reactor-fuel").innerHTML = reactor.fuel;
    }

}, false);



function addFuel(fuelType) {
    if (reactor.fuel < reactor.maxFuel) {
        reactor.fuel = fuelType.fuelCount + reactor.fuel;
        reactor.isEmpty = false;
        document.getElementById("reactor-isempty").innerHTML = reactor.isEmpty;
        document.getElementById("fuel-meter").setAttribute('value', reactor.fuel);
        if (reactor.fuel > reactor.maxFuel) {
            reactor.fuel = reactor.maxFuel;
            document.getElementById("reactor-fuel").innerHTML = reactor.fuel;
        }
    } 
}

function generate() {
    if (reactor.fuel > 0) {
        reactor.fuel = reactor.fuel - reactor.burnRate;
        power = power + reactor.genRate;
    }
    if (reactor.fuel === 0) {
        reactor.isEmpty = true;
    } else {
        reactor.isEmpty = false;
    }
    document.getElementById("reactor-level").innerHTML = reactor.level;
    document.getElementById("reactor-fuel").innerHTML = reactor.fuel;
    document.getElementById("fuel-meter").setAttribute('value', reactor.fuel);
    document.getElementById("reactor-burnrate").innerHTML = reactor.burnRate;
    document.getElementById("reactor-genrate").innerHTML = reactor.genRate;
    document.getElementById("reactor-tickspeed").innerHTML = reactor.tickSpeed;
    document.getElementById("reactor-isempty").innerHTML = reactor.isEmpty;
    document.getElementById("reactor-max-fuel").innerHTML = reactor.maxFuel;
    document.getElementById("power").innerHTML = power;

};

window.setInterval(function() {
    generate();
}, reactor.tickSpeed);



// var fuelInv = document.getElementById("fuel-inventory");
// var fuelSlot = document.getElementById("fuel-slot");

// function fuelClick(clickValue) {
//     if (fuel < fuelLimit) {
//         fuel = fuel + clickValue;
//     }
//     document.getElementById("fuel").innerHTML = fuel;
// }

// //Drag and drop stuff below

// var drake = dragula({
//     isContainer: function(el) {
//         return el.classList.contains('drag-container');
//     },
//     copy: function(el, source) {
//         return source === document.getElementById("fuel-inventory")
//     },
//     accepts: function(el, target) {
//         return target !== document.getElementById("fuel-inventory")
//     },
//     moves: function(el) {
//         if (el.classList.contains('no-drag')) {
//             return false;
//         } else {
//             return true;
//         }
//     }
// });

// drake.on('drop', function(el, target) {
//     // if (target.id == "fuel-slot") {
//     //     console.log('Fuel placed in reactor.');
//     //     lockFuel();
//     // } else {
//     //     console.log('fail')
//     // }

// });

// function lockFuel() {
//     var fuel = document.getElementsByClassName("fuel");
//     for (var i = 0; i < fuel.length; i++) {
//         fuel[i].classList.add('no-drag');
//     }
// }