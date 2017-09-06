(function () {
    'use strict'
    angular
        .module('backend')
        .controller('ControllerServiciosAdmin', ControllerServiciosAdmin);

    function ControllerServiciosAdmin($scope) {
        $scope.isLoaded = false;
        $scope.isLoading = true;
        $scope.displayAddBlock = false;

        $scope.serviceType = '';
        var    persistService = {},
            localChanged = false;
        $scope.dropPlaceholder = 'Seleccione tipo de servicio';

        $scope.listOptions = {
            options: [],
            selected: $scope.dropPlaceholder,
            open: false
        };

        $scope.allServicies = {};
        $scope.newElement = {
            newObject: undefined
        };

        $scope.service = {
            data: {},
            headers: {}
        };

        $scope.addElement = function() {
            $scope.displayAddBlock = true;
        }

        $scope.aceptElement = function(newElement){
            var tempData = $scope.service.data;
            tempData[$scope.service.data.length] = newElement;
            $scope.service.data = tempData;

            $scope.displayAddBlock = false;
        };

        $scope.cancelElement = function(){
            $scope.displayAddBlock = false;
        };

        $scope.persistService;

        $scope.upLevel = function (index) {
            var tempData = {};
            var selectedObj = null;
            var indexCont = 0;
            angular.forEach($scope.service.data, function(currentObj, indexList){

                if(index == indexList) {
                    selectedObj = tempData[indexCont-1];
                    tempData[indexCont-1] = currentObj;
                    tempData[indexCont] = selectedObj;
                } else {
                    tempData[indexCont] = currentObj;
                }

                indexCont ++;
            });
            $scope.service.data = tempData;
            $scope.setValue();
        };

        $scope.downLevel = function (index) {
            var tempData = {};
            var selectedObj = null;
            var indexCont = 0;
            angular.forEach($scope.service.data, function(currentObj, indexList){

                if(index != indexList) {
                    tempData[indexCont] = currentObj;
                } else {
                    return selectedObj = currentObj;
                }

                if(selectedObj != null) {
                    indexCont ++;
                    tempData[indexCont] = selectedObj;
                    selectedObj = null;
                }
                indexCont ++;
            });
            $scope.service.data = tempData;
            $scope.setValue();
        };

        var usersDB = firebase.database().ref('data/servicios');

        usersDB.on('value', function (data) {
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allServicies = data.val();
            $scope.service.data = data.val()[$scope.serviceType];
            $scope.isLoaded = true;
            persistService = data.val();
            $scope.isLoading = false;
            if (localChanged) { // evita apply si los cambios son locales. 
                localChanged = false;
                return;
            }
            $scope.$apply();
        });

        $scope.setValue = function () {
            localChanged = true;
            firebase.database().ref('data/servicios/' + $scope.serviceType).set($scope.service.data);

        }

        $scope.isObject = function (element) {
            return typeof element == "object";
        }

        $scope.$watch('listOptions.selected', function (val) {
            if (val == $scope.dropPlaceholder) { return; }
            $scope.service.data = $scope.allServicies[val];
            $scope.serviceType = val;
        }, true);

        /* $scope.addDetail = function() {
            var servKeys = Object.keys($scope.allServicies.utiles);
            servKeys.forEach(function(element) {
                if($scope.allServicies.utiles[element].detalle){ return; }
                $scope.allServicies.utiles[element]['detalle'] = {
                    direccion: ""
                }
            });
            firebase.database().ref('data/servicios/utiles').update($scope.allServicies.utiles);
        } */


        $scope.sendUtil = function () {
            var objToSend = {
                "nombre": 'Cerrajería',
                "tel": '526438'
            }
            var newTelKey = firebase.database().ref('data/servicios/utiles').push().key;
            firebase.database().ref('data/servicios/utiles/' + newTelKey).update(objToSend);
        }


        $scope.writeData = function () {
            /* var months = [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ];
            months.forEach(function(element) {
                execFB(element);
            }, this); */
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

            /*$.ajax("./data/servicios.json")
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
                });*/
            /*$.ajax("./data/servicios.json")
                .done(function (response) {
                    console.log(response);
                    response.remises.forEach(function (element) {
                        var objToSend = {
                            "nombre": element.nombre,
                            "tel": element.tel,
                            "detalle": {
                                "patente": element.detalle.patente,
                                "marca": element.detalle.marca,
                                "modelo": element.detalle.modelo
                            }
                        }
                        var newTelKey = firebase.database().ref('data/servicios/remises').push().key;
                        firebase.database().ref('data/servicios/remises/' + newTelKey).update(objToSend);
                    }, this);
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                });*/

            /*$.ajax("./data/servicios.json")
                .done(function (response) {
                    console.log(response);
                    response.instituciones.forEach(function (element) {
                        var objToSend = {
                            "nombre": element.nombre,
                            "tel": element.tel,
                            "mapa": element.mapa,
                            "detalle": {
                                "direccion": element.detalle.direccion
                            }
                        }
                        var newTelKey = firebase.database().ref('data/servicios/instituciones').push().key;
                        firebase.database().ref('data/servicios/instituciones/' + newTelKey).update(objToSend);
                    }, this);
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                   });*/


        }

        /* function execFB(month) {
           $.ajax("./data/calendar/" + month + ".json")
               .done(function (response) {
                   console.log(response);
                   
                   //var newTelKey = firebase.database().ref('data/farmacias/calendar').push().key;
                   firebase.database().ref('data/farmacias/calendario/' + month).update(response);
                   //}, this); 
               })
               .fail(function () {
                   console.log("error");
               })
               .always(function () {
                   console.log("complete");
               });
       } */


    };
})();
