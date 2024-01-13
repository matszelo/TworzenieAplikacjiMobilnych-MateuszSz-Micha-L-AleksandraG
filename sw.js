// Definicja stałej dla nazwy statycznej pamięci podręcznej
const staticCacheName = 'site-static-v0';

// Definicja stałej dla nazwy dynamicznej pamięci podręcznej
const dynamicCache = 'site-dynamic-v0';

// Lista zasobów do umieszczenia w pamięci podręcznej
const assets = [
  "./",                   // Główny katalog (często korzeń projektu)
  './index.html',         // Plik HTML strony głównej
  './index.css',          // Plik CSS dla strony głównej
  './style.css',          // Dodatkowy plik CSS
  './images/logo192.png', // Obrazek logo w formacie PNG
  './login-page.html',    // Plik HTML strony logowania
];




// Obsługa zdarzenia instalacji service workera
self.addEventListener('install', event => {
  // Oczekiwanie na zakończenie instalacji, zanim zostaną dodane zasoby do pamięci podręcznej
  event.waitUntil(
      // Otwarcie pamięci podręcznej o nazwie staticCacheName
      caches.open(staticCacheName).then(cache => {
          // Logowanie informacji o buforowaniu zasobów plików
          console.log('Buforowanie zasobów plików');
          // Dodanie wszystkich zasobów zdefiniowanych w tablicy 'assets' do pamięci podręcznej
          cache.addAll(assets);
      })
  );
});



// Obsługa zdarzenia aktywacji service workera
self.addEventListener('activate', event => {
  // Oczekiwanie na zakończenie aktywacji przed automatycznym usuwaniem starych pamięci podręcznych
  event.waitUntil(
    // Pobranie kluczy wszystkich dostępnych pamięci podręcznych
    caches.keys().then(keys => {
      // Automatyczne usuwanie starych pamięci podręcznych (z wyjątkiem pamięci podręcznej o nazwie staticCacheName)
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});


// Obsługa zdarzenia fetch przez service workera
self.addEventListener('fetch', event => {
  // Odpowiedź na żądanie, używając pamięci podręcznej
  event.respondWith(
    // Sprawdzenie, czy istnieje odpowiednik żądania w pamięci podręcznej
    caches.match(event.request).then(response => {
      // Jeśli odpowiedź istnieje w pamięci podręcznej, zwróć ją
      if (response) {
        return response;
      }
      // W przeciwnym razie, wykonaj rzeczywiste żądanie sieciowe
      return fetch(event.request).then(fetchResponse => {
        // Otwórz dynamiczną pamięć podręczną
        return caches.open(dynamicCache).then(cache => {
          // Dodaj odpowiedź do dynamicznej pamięci podręcznej i zwróć odpowiedź sieciową
          cache.put(event.request.url, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});

/*
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function (clientList) {
      // Sprawdź, czy otwarte jest okno z login-page.html
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == 'login-page.html' && 'focus' in client) {
          return client.focus();
        }
      }
      // Jeśli nie jest otwarte, otwórz nowe okno z login-page.html
      if (clients.openWindow) {
        return clients.openWindow('login-page.html');
      }
    })
  );
});
*/
