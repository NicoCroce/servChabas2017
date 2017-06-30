(function() {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('indexedDB', indexedDB);

    function indexedDB() {

        //check for support
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }

        var dbPromise = idb.open('test-db4', 2, function(upgradeDb) {
            if (!upgradeDb.objectStoreNames.contains('servicios')) {
                var peopleOS = upgradeDb.createObjectStore('servicios', { keyPath: 'name' });
                peopleOS.createIndex('name', 'name', { unique: false });
            }
        });

        return {
            setData: setData,
            getData: getData,
            getItem: getItem
        }

        function getData() {
            dbPromise.then(function(db) {
                var tx = db.transaction('servicios', 'readonly');
                var store = tx.objectStore('servicios');
                return store.getAll();
            }).then(function(items) {
                console.log('Items by name:', items);
            });
        }

        function setData() {
            dbPromise.then(function(db) {
                var tx = db.transaction('servicios', 'readwrite');
                var store = tx.objectStore('servicios');
                var item = {
                    name: 'remises',
                    data: {
                        price: 4.80,
                        description: {
                            nombre: 'nico',
                            hola: '12344444'
                        },
                        created: new Date().getTime()
                    }
                };
                store.put(item);
                return tx.complete;
            }).then(function() {
                console.log('added item to the store os!');
            });
        }

        function getItem() {
            dbPromise.then(function(db) {
                var tx = db.transaction('servicios', 'readonly');
                var store = tx.objectStore('servicios');
                var index = store.index('name');
                return index.openCursor('colectivos');
            }).then(function showRange(cursor) {
                if (!cursor) { return; }
                console.log('Cursored at:', cursor.key);
                for (var field in cursor.value) {
                    console.log(cursor.value[field]);
                }
                return cursor.continue().then(showRange);
            }).then(function() {
                console.log('Done cursoring');
            });
        }
    };
})();