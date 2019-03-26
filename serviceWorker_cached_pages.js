// Cache entire website
const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js'
]


// Call install event
self.addEventListener('install', (event) => {
  console.log('servcie worker is installed')
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('service worker caching all')
      return cache.addAll(cacheAssets)
    })
    .then(() => {
      self.skipWaiting()
    })
  )
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
    fetch(event.request).catch(() => caches.match(event.request))
  )
})