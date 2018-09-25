var fuel = 0;
var fuelLimit = 10;
var power = 0;
var powerGen = 1;
var fuelBurn = 1;

function fuelClick(number) {
    if (fuel < fuelLimit) {
        fuel = fuel + number;
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

window.setInterval(function(){
    
    generate();
    
}, 1000);