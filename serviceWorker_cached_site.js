// Cache entire website
const cacheName = 'v2';

// Call install event
self.addEventListener('install', (event) => {
  console.log('servcie worker is installed')
  

})

// Call activate event
self.addEventListener('activate', (event) => {
  console.log('activated')
  // remove unwanted caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('delete old cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})


// Call fetch event 
self.addEventListener('fetch', event => {
  console.log('service worker: fetching')
  event.respondWith(
    fetch(event.request)
    .then(res => {
      // Make copy/clone resopnse
      const resClone = res.clone();
      // Open cache
      caches.open(cacheName)
        .then(cache => {
          // Add response to cache
          cache.put(event.request, resClone)
        })
      return res;
    })
    .catch(err => caches.match(event.request).then(res => res))
  )
})