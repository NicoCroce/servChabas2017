var fs = require('fs');

module.exports.init = function (){

	var calendar2017 = {
            enero: {
                days: 31,
                calendar: []
            },
            febrero: {
                days: 28,
                calendar: []
            },
            marzo: {
                days: 31,
                calendar: []
            },
            abril: {
                days: 30,
                calendar: []
            },
            mayo: {
                days: 31,
                calendar: []
            },
            junio: {
                days: 30,
                calendar: []
            },
            julio: {
                days: 31,
                calendar: []
            },
            agosto: {
                days: 31,
                calendar: []
            },
            septiembre: {
                days: 30,
                calendar: []
            },
            octubre: {
                days: 31,
                calendar: []
            },
            noviembre: {
                days: 30,
                calendar: []
            },
            diciembre: {
                days: 31,
                calendar: []
            },
        };


    var farmacias = ['Bianchini', 'Torres', 'Busilacchi', 'Pacini', 'Gismondi', 'Pace', 'La Plaza', 'Del Grecco'];
    var currentFarmacy = 0;

    var date = new Date();
    var month = date.getMonth() + 1; //Enero index 1;

    Object.keys(calendar2017).forEach(function (monthSelected) {
        for (var i = 1; i <= calendar2017[monthSelected].days; i++) {
            var dayFormat = { day: i, farmacia: farmacias[currentFarmacy]};
            calendar2017[monthSelected].calendar[i] = dayFormat;
            (currentFarmacy < farmacias.length-1) ? currentFarmacy++ : currentFarmacy = 0;
        }
        fs.writeFile(monthSelected + '.json', JSON.stringify(calendar2017[monthSelected]));
    });
}