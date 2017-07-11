(function () {
    'use strict'
    angular
        .module('backend')
        .controller('ServicesControllerBackend', ServicesControllerBackend);

    function ServicesControllerBackend($scope) {




       /* $scope.writeData = function() {
            //firebase.database().ref('data/servicios').update();
            $.ajax("../assets/data/telefonos.json")
                .done(function (response) {
                    console.log(response);
                    response.utiles.forEach(function (element) {
                        var objToSend = {
                            "name": Object.keys(element)[0],
                            "number": element[Object.keys(element)[0]]
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
                });
        }*/
    };
})();
