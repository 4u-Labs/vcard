const CACHE_NAME = 'vcard-executive-v3.3';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=3.3',
  './qrcode.min.js?v=3.3',
  './app.js?v=3.3',
  './manifest.json?v=3.3',
  './icon-192.png?v=3.3',
  './icon-512.png?v=3.3',
  './icon.webp?v=3.3',
  './favicon.png?v=3.3'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Pure Network-First with cache: 'no-cache' so mobile browsers never serve stale CSS/JS
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
