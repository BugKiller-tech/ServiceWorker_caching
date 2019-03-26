// Makre sure service workers are supported

if ('serviceWorker' in navigator) {
  console.log('Service workers are supported!')
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('../serviceWorker_cached_pages.js')
    // .then(reg => console.log('service workder registered'))
    // .catch(err =>  console.log(`Service worker error: ${err}`))

    navigator.serviceWorker.register('../serviceWorker_cached_site.js')
    .then(reg => console.log('service workder registered'))
    .catch(err =>  console.log(`Service worker error: ${err}`))
  })    
}