const CACHE_NAME = "mi-app-cache-v1";
const STATIC_FILES = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/ISOTIPO SOFT TOWER.svg",
  "/GIFT LOGO.gif",
  "/SOFTOWER-LOGIN.jpg",
  "/SOFTOWER-LOGIN2.jpg",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker instalado y cacheando archivos");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match("/index.html"); // Devuelve el HTML base si todo falla
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Borrando caché antigua:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
