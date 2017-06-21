(function(){
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('indexDB', indexDB);

    function indexDB(){
        return {
            initDB: initDB
        }

        function initDB() {
            if (!window.indexedDB) {
                return console.log("Su navegador no soporta una versión estable de indexedDB.Tal y como las características no serán validas");
            }

            var request = indexedDB.open('videos');
            request.onerror = function () {
                console.log('failed to open indexedDB');
            };
            request.onsuccess = function (event) {
                console.log(event);
                // handle version control
                // then create a new object store
            };
        }
};
})();
