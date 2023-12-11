// Funkcja sprawdzająca dostępność service worker i interfejsu API powiadomień
const checkPermission = () => {

  // Sprawdzenie czy przeglądarka obsługuje service worker
  if (!('serviceWorker' in navigator)) {
      throw new ErrorEvent("No support for service worker!");
  }

  // Sprawdzenie czy przeglądarka obsługuje interfejs API powiadomień
  if (!('Notification' in window)) {
      throw new ErrorEvent("No support for notification API!");
  }
}



// Funkcja asynchroniczna służąca do zarejestrowania service workera
const registerSW = async () => {
  // Zarejestrowanie service workera o nazwie 'sw.js' i oczekiwanie na zakończenie tego procesu
  const registration = await navigator.serviceWorker.register('sw.js');

  // Zwrócenie obiektu reprezentującego zarejestrowany service worker
  return registration;
}


  // Sprawdź, czy przycisk rejestracji został znaleziony w dokumencie
  const registerBtn = document.getElementById('register_btn');

  if (registerBtn) {
    // Dodaj nasłuchiwanie na zdarzenie kliknięcia przycisku rejestracji
    registerBtn.addEventListener('click', () => {

      // Sprawdź, czy przeglądarka obsługuje API powiadomień
      if ('Notification' in window) {

        // Poproś o zgodę na wyświetlanie powiadomień
        Notification.requestPermission().then(permission => {

          // Jeśli zgodę udzielono ('granted'), wyślij powiadomienie
          if (permission === 'granted') {
            new Notification('Rejestracja', {
              body: 'Udało Ci się zarejestrować! Zaloguj się!',
            });

            // Przekierowanie na stronę login-page.html po kliknięciu i wyświetleniu powiadomienia
            window.location.href = 'login-page.html';
          }
        });
      } else {
        // Komunikat o błędzie, jeśli przeglądarka nie obsługuje powiadomień
        console.error('Twoja przeglądarka nie obsługuje powiadomień.');
      }
    });
  }



// Funkcja do znalezienia lokalizacji użytkownika
function geoFindMe() {
  // Pobranie referencji do elementów HTML: #status i #map-link
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  // Wyzerowanie zawartości linku do mapy i tekstu statusu
  mapLink.href = "";
  mapLink.textContent = "";

  // Funkcja wywoływana w przypadku sukcesu w uzyskaniu lokalizacji
function success(position) {
  // Pobranie szerokości i długości geograficznej
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Dodanie wibracji po uzyskaniu lokalizacji
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200]); // Przykładowe wartości do dostosowania
  }

  // Wyświetlenie komunikatu o lokalizacji
  status.textContent = "Locating…";

  // Wywołanie usługi Geocoding API w celu uzyskania adresu na podstawie współrzędnych geograficznych
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8010c207e2cc41d581a6ce30a4625538`)
    .then(response => response.json())
    .then(data => {
      // Sprawdzenie, czy istnieją wyniki i czy uzyskano adres
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted;
        status.textContent = `Address: ${address}`;
      } else {
        // Komunikat, gdy nie udało się uzyskać adresu
        status.textContent = "Unable to retrieve address";
      }
    })
    .catch(error => {
      // Obsługa błędu przy uzyskiwaniu adresu
      status.textContent = "Error retrieving address";
      console.error(error);
    });
}

  // Funkcja wywoływana w przypadku błędu przy uzyskiwaniu lokalizacji
  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  // Sprawdzenie czy przeglądarka obsługuje geolokalizację
  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    // Wywołanie getCurrentPosition w celu uzyskania bieżącej lokalizacji
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// Dodanie nasłuchiwania na kliknięcie przycisku o id "find-me" i wywołanie funkcji geoFindMe
document.querySelector("#find-me").addEventListener("click", geoFindMe);




  
// Wywołanie funkcji sprawdzającej dostęp do service workera i interfejsu API powiadomień
checkPermission();

// Wywołanie funkcji rejestracji service workera
registerSW();

