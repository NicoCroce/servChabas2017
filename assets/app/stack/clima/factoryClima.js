(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryClima', factoryClima);

    function factoryClima() {
        return {
            getData: getData
        };

        function getData(data) {
            return {
                actual: {
                    temperatura: {  },
                    humedad: { },
                },
                dia: {
                    temperatura: {
                        prop: 'Temperatura', 
                        actual: data.temperatura.actual,
                        min: data.temperatura.diaria.min, 
                        max: data.temperatura.diaria.max,
                        hMin: data.temperatura.hora.min,
                        hMax: data.temperatura.hora.max
                    },
                    humedad: {
                        prop: 'Humedad',
                        actual: data.humedad.actual,
                        min: data.humedad.diaria.min,
                        max: data.humedad.diaria.max,
                        hMin: data.humedad.hora.min,
                        hMax: data.humedad.hora.max
                    },
                    rocio: { prop: 'Rocío', value: data.rocio.actual },
                    st: { prop: 'Sensación Térmica', value: data.temperaturaHumedad.actual },
                    pb: { prop: 'Presión Barométrica', value: data.presion.actual },
                    viento: { prop: 'Viento', value: data.viento.velocidad + '     ' + data.viento.delSector },
                    lluvia: { 
                        prop: 'Lluvia', 
                        actual: data.lluvia.diaria,
                        intensidad: data.lluvia.intensidad,
                        mensual: data.lluvia.mensual,
                        anual: data.lluvia.anual
                    }
                }
            };
        }
    };
})();
