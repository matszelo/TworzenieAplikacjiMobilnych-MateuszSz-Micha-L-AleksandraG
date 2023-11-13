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

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    } else {
        new Notification("Hello world");
    }
}

const button = document.querySelector("login-page-navlink1 button")
button.addEventListener("click", () => {
    alert("Zalogowano")
})




checkPermission()
registerSW()
requestNotificationPermission()