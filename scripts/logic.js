var fuel = 0;
var fuelLimit = 10;
var power = 0;
var powerGen = 1;
var fuelBurn = 1;
var generatorTick = 1000;
var clickValue = 1;

var fuelInv = document.getElementById("fuel-inventory");
var fuelSlot = document.getElementById("fuel-slot");

function fuelClick(clickValue) {
    if (fuel < fuelLimit) {
        fuel = fuel + clickValue;
    }
    document.getElementById("fuel").innerHTML = fuel;
}

function generate() {
    if (fuel > 0) {
        fuel = fuel - fuelBurn;
        power = power + powerGen;
    }
    document.getElementById("power").innerHTML = power;
    document.getElementById("fuel").innerHTML = fuel;
};

window.setInterval(function() {

    generate();

}, generatorTick);

//Drag and drop stuff below

var drake = dragula({
    isContainer: function(el) {
        return el.classList.contains('drag-container');
    },
    copy: function(el, source) {
        return source === document.getElementById("fuel-inventory")
    },
    accepts: function(el, target) {
        return target !== document.getElementById("fuel-inventory")
    },
    moves: function(el) {
        if (el.classList.contains('no-drag')) {
            return false;
        } else {
            return true;
        }
    }
});

drake.on('drop', function (el, target) {
  console.log('Fuel placed in reactor.');
  lockFuel();
});


function lockFuel() {
var fuel = document.getElementsByClassName("fuel");
for(var i = 0; i < fuel.length; i++)
{
    fuel[i].classList.add('no-drag');
}
}



