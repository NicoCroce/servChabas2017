(function(){
    'use strict';
    angular
        .module('backend')
        .factory('firebaseUtil', firebaseUtil);

    function firebaseUtil (){
        return {
            addElement: addElement,
            removeElement: removeElement,
            jsonToArray: jsonToArray,
            arrayToJson: arrayToJson,
            upLevel: upLevel,
            downLevel: downLevel
        }

        function addElement(elementsArrays, objToInsert, index) {
            index = parseInt(index);
            elementsArrays.splice(index, 0, objToInsert)
            return elementsArrays;
        }

        function jsonToArray(jsonData){
            var newArray = [];
            for (var i in jsonData)
                newArray.push([i, jsonData[i]]);
            return;
        }

        function upLevel(elementsArrays, index) {
            index = parseInt(index);
            var currentElement = elementsArrays[index];
            elementsArrays.splice(index, 1);
            elementsArrays.splice(index-1, 0, currentElement);
            return;
        }

        function downLevel(elementsArrays, index) {
            index = parseInt(index);
            var currentElement = elementsArrays[index];
            elementsArrays.splice(index, 1);
            elementsArrays.splice(index+1, 0, currentElement);
            return;
        }

        function removeElement(elementsArrays, index){
            return elementsArrays.splice(index, 1);
        };

        function arrayToJson(){};

        /* function addElementIndex(index, objToAdd) {
            var tempData = $scope.service.data;
            var selectedObj = null;
            var indexCont = 0;
            var lastIndex = $scope.service.data.length;
            for (var indexArray = lastIndex; indexArray > index; indexArray--) {
                tempData[indexArray] = $scope.service.data[indexArray - 1];
            }
            tempData[index] = objToAdd;
            $scope.service.data = tempData;
            $scope.setValue();
        }

        $scope.upLevel = function (index) {
            var tempData = {};
            var selectedObj = null;
            var indexCont = 0;
            angular.forEach($scope.service.data, function (currentObj, indexList) {

                if (index == indexList) {
                    selectedObj = tempData[indexCont - 1];
                    tempData[indexCont - 1] = currentObj;
                    tempData[indexCont] = selectedObj;
                } else {
                    tempData[indexCont] = currentObj;
                }

                indexCont++;
            });
            $scope.service.data = tempData;
            $scope.setValue();
        };

        $scope.downLevel = function (index) {
            var tempData = {};
            var selectedObj = null;
            var indexCont = 0;
            angular.forEach($scope.service.data, function (currentObj, indexList) {

                if (index != indexList) {
                    tempData[indexCont] = currentObj;
                } else {
                    return selectedObj = currentObj;
                }

                if (selectedObj != null) {
                    indexCont++;
                    tempData[indexCont] = selectedObj;
                    selectedObj = null;
                }
                indexCont++;
            });
            $scope.service.data = tempData;
            $scope.setValue();
        }; */
};
})();
