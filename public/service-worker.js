const CACHE_NAME = "mi-app-cache-v2";

// Este array debe contener los archivos reales que se generan en la carpeta de salida de tu build.
const STATIC_FILES = [
  "/", // La raíz de la app
  "/index.html", // Página principal
  "/offline.html", // Página de fallback si no hay internet
  "/styles.css", // Estilos
  "/assets/main.js", // El bundle de JS generado en producción
  "/assets/vendor.js", // Si tienes librerías externas separadas
  "/ISOTIPO SOFT TOWER.svg",
  "/GIFT LOGO.gif",
  "/SOFTOWER-LOGIN.jpg",
  "/SOFTOWER-LOGIN2.jpg"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker instalado y cacheando archivos...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
  self.skipWaiting(); // Activa el SW inmediatamente
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html"); // Página de "sin conexión"
          }
        })
      );
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
  self.clients.claim(); // Activa la nueva versión del SW inmediatamente
});
