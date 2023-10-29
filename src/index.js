if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((register) => console.log('SerwiceWorker zarejestrowany', register))
    .catch((error) => console.log('Rejestracja SerwiceWorker nie powiodła się!', error));
}