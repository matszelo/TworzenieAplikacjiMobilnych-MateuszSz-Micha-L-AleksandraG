if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("sw.js").then(registration =>{
    console.log("SW Zarejestrowany!");
    console.log(registration);
}).catch(error => {
    console.log("Rejestracja SW nie powiodła się!");
    console.log(error);
})

}