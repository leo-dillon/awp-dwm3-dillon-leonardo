let cacheName = 'leoCache'
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(
                [
                'index.html'
                ])
        })
    )

})

self.addEventListener('activate', (e) => {
    console.log('El SW esta activo', e);
})
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request) 
            .then( response => {
                if( response ){
                    return response
                }
                return fetch(e.request)
            })
    )
})