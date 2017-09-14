(function(){
    'use strict'
    angular
        .module('backend')
        .factory('newElement', newElement);

    function newElement (){

        var mainBlock = {
            nombre: "",
            tel: "",
            detalle: {
                direccion: "",
                disponible: ""
            },
            mapa: ""
        };

        var remises = {
            nombre: "",
            tel: "",
            detalle: {
                marca: "",
                modelo: "",
                patente: ""
            }
        };

        var colectivos = {
            horario: '',
            empresa: '',
            detalle: ''
        }

        return {
            instituciones: mainBlock,
            remises: remises,
            rotiserias: mainBlock,
            utiles: mainBlock,
            colectivos: colectivos
        }
};
})();
