(function(){
    'use strict'
    angular
        .module('backend')
        .controller('ControllerServiciosAdmin', ControllerServiciosAdmin);

    function ControllerServiciosAdmin ($scope){
        $scope.isLoaded = false;
        $scope.isLoading = true;
        var typeService = '',
            persistService = {},
            localChanged = false;

        $scope.listOptions = {
            options: [],
            selected: 'Seleccione tipo de servicio',
            open: false
        };

        $scope.allServicies = {};

        $scope.service = {
            data: {},
            headers: {} 
        };

        $scope.persistService;

        var usersDB = firebase.database().ref('data/servicios');

        usersDB.on('value', function (data) {
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allServicies = data.val();
            $scope.service.data = data.val()[typeService];
            $scope.isLoaded = true;
            persistService = data.val();
            $scope.isLoading = false;
            if (localChanged) { // evita apply si los cambios son locales. 
                localChanged = false;
                return;
            }
            $scope.$apply();
        });

        $scope.setValue = function() {
            localChanged = true;
            firebase.database().ref('data/servicios/' + typeService).update($scope.service.data);
        }

        $scope.isObject = function(element) {
            return typeof element == "object";
        }

        $scope.$watch('listOptions.selected', function(val){
            $scope.service.data = $scope.allServicies[val];
            typeService = val;          
        }, true);


         $scope.writeData = function() {
            //firebase.database().ref('data/servicios').update();
            /*$.ajax("./data/telefonos.json")
                .done(function (response) {
                    console.log(response);
                    response.utiles.forEach(function (element) {
                        var objToSend = {
                            "nombre": Object.keys(element)[0],
                            "tel": element[Object.keys(element)[0]]
                        }
                        var newTelKey = firebase.database().ref('data/servicios/utiles').push().key;
                        firebase.database().ref('data/servicios/utiles/' + newTelKey).update(objToSend);
                    }, this);
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                });*/

             $.ajax("./data/servicios.json")
                 .done(function (response) {
                     console.log(response);
                     response.rotiserias.forEach(function (element) {
                         var objToSend = {
                             "nombre": element.nombre,
                             "tel": element.tel,
                             "detalle": {
                                 "direccion": element.detalle.direccion,
                                 "disponible": element.detalle.disponible
                             },
                             "mapa": element.mapa
                         }
                         var newTelKey = firebase.database().ref('data/servicios/rotiserias').push().key;
                         firebase.database().ref('data/servicios/rotiserias/' + newTelKey).update(objToSend);
                     }, this);
                 })
                 .fail(function () {
                     console.log("error");
                 })
                 .always(function () {
                     console.log("complete");
                 });
        }


    };
})();
