$(function() {
    var fuel = 0;

    $("#refuel").click(function() {
        if (fuel < 100) {
            fuel = fuel + 10;
            $("#reactor-fuel-level").val(fuel)
        } else {
            console.log("Max Fuel")
        }
    });

    function decreaseFuel() {
        if (fuel > 0) {
            fuel = fuel - 5;
            $("#reactor-fuel-level").val(fuel)
            $("#reactor-core").addClass('reactor-active')
        } else {
            $("#reactor-core").removeClass('reactor-active')
        }
    }
    setInterval(decreaseFuel, 1000);
});