(function(){
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('indexedDB', indexedDB);

    function indexedDB (){

        //check for support
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }

        var dbPromise = idb.open('test-db4', 1, function (upgradeDb) {
            if (!upgradeDb.objectStoreNames.contains('servicios')) {
                var peopleOS = upgradeDb.createObjectStore('servicios', { autoIncrement: true });
                peopleOS.createIndex('name', 'name', { unique: false });
            }
        });

        dbPromise.then(function (db) {
            var tx = db.transaction('servicios', 'readwrite');
            var store = tx.objectStore('servicios');
            var item = {
                name: 'colectivos',
                data: {
                    price: 4.99,
                    description: {
                        nombre: 'nico',
                        hola: '12344444'
                    },
                    created: new Date().getTime()
                }
            };
            store.add(item);
            return tx.complete;
        }).then(function () {
            console.log('added item to the store os!');
        });

        dbPromise.then(function (db) {
            var tx = db.transaction('servicios', 'readonly');
            var store = tx.objectStore('servicios');
            return store.getAll();
        }).then(function (items) {
            console.log('Items by name:', items);
        });

        return {
        }

};
})();
