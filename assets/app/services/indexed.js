(function() {
    'use strict';
    angular.module('indexdb', [])
        .factory('indexedDB', indexedDB);

    function indexedDB($rootScope) {

        //check for support
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }

        var dbPromise = idb.open('chabashoy', 2, function(upgradeDb) {
            if (!upgradeDb.objectStoreNames.contains('DB')) {
                var servicesOS = upgradeDb.createObjectStore('DB', { keyPath: 'name' });
                servicesOS.createIndex('name', 'name', { unique: false });
            }
        });

        return {
            setData: setData,
            getData: getData,
            getItem: getItem
        }

        function getData(storeName) {
            dbPromise.then(function(db) {
                var tx = db.transaction(storeName, 'readonly');
                var store = tx.objectStore(storeName);
                return store.getAll();
            }).then(function(items) {
                /*console.log('Items by name:', items);*/
            });
        }

        function setData(storeName, item) {
            dbPromise.then(function(db) {
                var tx = db.transaction(storeName, 'readwrite');
                var store = tx.objectStore(storeName);
                store.put(item);
                return tx.complete;
            }).then(function() {
                $rootScope.$emit('updateData');
                /*console.log('added item to the store os!');*/
            });
        }

        function getItem(storeName, cbReturn) {
            dbPromise.then(function(db) {
                var tx = db.transaction([storeName], 'readonly');
                var store = tx.objectStore(storeName);
                var index = store.index('name');
                return index.openCursor(storeName);
            }).then(function showRange(cursor) {
                if (!cursor) { return cbReturn(null); }
                /*console.log('Cursored at:', cursor.key);*/
                /* for (var field in cursor.value) {
                    cbReturn(cursor.value[field]);
                } */
                return cursor.continue().then(cbReturn(cursor.value["data"]));
            }).then(function() {
                /*console.log('Done cursoring');*/
            });
        }
    };
})();