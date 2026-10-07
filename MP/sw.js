const CACHE_NAME = 'meteo-parapente-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icono-192.png',
  './icono-512.png'
];

// Instala el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Responde a peticiones (permite funcionar offline básico)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});