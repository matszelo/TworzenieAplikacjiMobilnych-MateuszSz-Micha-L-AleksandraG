//Instalacja SW
self.addEventListener("install", (event) => {
    function onInstall() {
      return caches
        .open("static")
        .then((cache) =>
          cache.addAll([
            "/",
            "/src/master.css",
            "/images/logo192.png",
          ])
        );
    }
   
    event.waitUntil(onInstall(event));
  });

//Fetch Event
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  });

  //Aktywacja SW
  self.addEventListener("activate", (event) => {
    function onActivate() {
      return caches.keys().then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== "static").map((key) => caches.delete(key))
        );
      });
    }
   
    event.waitUntil(onActivate(event));
  });

  navigator.serviceWorker.ready.then((swRegistration) => {
    return swRegistration.sync.register("event1");
  });

  self.addEventListener("sync", (event) => {
    if (event.tag === "event1") {
      event.waitUntil(doSomething());
    }
  });