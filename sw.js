/* sw.js — простой Service Worker для GitHub Pages (offline-first для статики) */
const CACHE_NAME = 'syntax-syndicate-v2';

// Минимальный список для оффлайна. Остальное докачивается по мере запросов.
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './data.js',
  './script.js',
  './bookmarks.html',
  './bookmarks.js',
  './lections.html',
  './lections.js',
  './settings.html',
  './settings-core.js',
  './settings-main.js',
  './settings.js',
  './markdown-viewer.html',
  './markdown-viewer.js',
  './tags-cloud.js',
  './ui.js',
  './manifest.webmanifest',
  './icon.svg',
  './404.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Не кэшируем внешние домены
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => {
        // Фолбэк для навигации
        if (req.mode === 'navigate') return caches.match('./index.html');
        throw new Error('Offline');
      });
    })
  );
});
