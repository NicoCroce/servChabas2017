(function () {
    'use strict'
    angular
        .module('chabasHoy')
        .controller('StackRadioController', StackRadioController);

    function StackRadioController($scope) {

        function stopRadios(id) {
            angular.forEach($scope.dataRadios, function(radio){
                if(radio.id != id ) { 
                    radio.isPlaying = false;
                }
            });
        }

        $scope.dataRadios = {
            radioUno: {
                id: 'radioUno',
                name: 'Radio UNO FM 99.1',
                isPlaying: false,
                range: 0.3,
                src: 'http://server1.dainusradio.com:9884/;',
                img: 'img/radioUno.png',
                cbStop: stopRadios
            },
            fmVolver: {
                id: 'fmVolver',
                name: 'Volver FM 92.5',
                isPlaying: false,
                range: 0.3,
                src: 'http://200.58.106.247:8718/;',
                img: 'img/fmVolver.png',
                cbStop: stopRadios
            },
            fmAutentica: {
                id: 'fmAutentica',
                name: 'FM Auténtica FM 106.9',
                isPlaying: false,
                range: 0.3,
                src: 'http://200.58.106.247:8720/;',
                img: 'img/fmAut.png',
                cbStop: stopRadios
            },
            fmvida: {
                id: 'fmVida',
                name: 'FM Vida 97.9',
                isPlaying: false,
                range: 0.3,
                src: 'http://fmvida.radio.rosario3.com:8000/fmvida.mp3/;',
                img: 'img/fmvida.png',
                cbStop: stopRadios
            }
        };
    };
})();
