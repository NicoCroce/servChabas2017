// Cache names
var dataCacheName = 'TODOData-v1.1.4'
var cacheName = 'nico'

// Application shell files to be cached

console.log(cacheName);

var filesToCache = [
    '/index.html'
/*    'js/script.js',
    'css/style.css',
    'js/min/libs.js'*/
];

self.addEventListener('install', (event) => {
    console.info('Event: Install');

    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                //[] of files to cache & if any of the file not present `addAll` will fail
                return cache.addAll(filesToCache)
                    .then(() => {
                        console.info('All files are cached');
                        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
                    })
                    .catch((error) => {
                        console.error('Failed to cache', error);
                    })
            })
    );
});

self.addEventListener('activate', function (e) {

    /*console.log('[ServiceWorker] Activate')*/

    e.waitUntil(

        caches.keys().then(function (keyList) {

            return Promise.all(keyList.map(function (key) {

                if (key !== cacheName && key !== dataCacheName) {

                    console.log('[ServiceWorker] Removing old cache', key)

                    return caches.delete(key)

                }

            }))

        })

    )

    return self.clients.claim()

})

self.addEventListener('fetch', function (e) {

   /* console.log('[ServiceWorker] Fetch', e.request.url)*/

    e.respondWith(

        caches.match(e.request).then(function (response) {

            return response || fetch(e.request)

        })

    )

})