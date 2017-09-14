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
                newArray.push(jsonData[i]);
            return newArray;
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
};
})();
