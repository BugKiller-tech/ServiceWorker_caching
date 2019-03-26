// Call install event

self.addEventListener('install', (e) => {
  console.log('servcie worker is installed')
})

// Call activate event
self.addEventListener('activate', (e) => {
  console.log('activated')
})