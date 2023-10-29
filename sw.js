const staticCacheName = 'site-static-v6';
const assets = [
  "./",
  './index.html',
  './src/master.css',
  './css/styles.css',
  './images/logo192.png',

];

//Instalacja SW
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(staticCacheName).then(cache => {
      console.log('Buforowanie zasobów plików')
      cache.addAll(assets)
      })
    )
});

//Aktywacja SW
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>{       //Automatyczne usuwanie starych cache
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  )
});

//Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(        //Pliki offline
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
