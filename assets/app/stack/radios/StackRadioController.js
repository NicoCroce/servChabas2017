(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('StackRadioController', StackRadioController);

    function StackRadioController($scope) {

        function stopRadios(id) {
            console.log(id);
            
        }

        $scope.dataRadios = {
            fmvida: {
                id: 'fmVida',
                name: 'FM Vida 97.9',
                isPlaying: false,
                range: 0.3,
                src: 'http://fmvida.radio.rosario3.com:8000/fmvida.mp3/;',
                img: 'img/fmvida.png',
                cbStop: stopRadios
            },
            radioUno: {
                id: 'radioUno',
                name: '99.1 Radio UNO',
                isPlaying: false,
                range: 0.3,
                src: 'http://server1.dainusradio.com:9884/;',
                img: 'img/radioUno.jpg',
                cbStop: stopRadios
            }
        };
    };
})();
