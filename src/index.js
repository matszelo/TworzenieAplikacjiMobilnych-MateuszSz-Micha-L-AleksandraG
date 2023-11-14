const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new ErrorEvent("Mo support for service worker!")
    }
    
    if (!('Notification' in window)) {
        throw new ErrorEvent("No support notification API!");
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}



function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
  
    mapLink.href = "";
    mapLink.textContent = "";
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  document.querySelector("#find-me").addEventListener("click", geoFindMe);

    const button = document.getElementById("register_btn");
    button.addEventListener("click", () => {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
            new Notification("Udało ci sie zarejestrować! Zaloguj się!");
        }
      });
    });

checkPermission()
registerSW()