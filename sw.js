/* sw.js — UncleDeniy PWA / оффлайн (GitHub Pages) */
const CACHE_NAME = 'uncledeniY-v4';

const CORE_ASSETS = [
  './',
  './index.html',
  './search.html',
  './item.html',
  './graph.html',
  './bookmarks.html',
  './lections.html',
  './settings.html',
  './author.html',
  './markdown-viewer.html',
  './404.html',

  './style.css',
  './layout.js',
  './theme.js',

  './data.js',
  './lections.js',
  './authors.js',
  './script.js',
  './item.js',
  './graph.js',
  './bookmarks.js',
  './settings-core.js',
  './settings-main.js',
  './settings.js',
  './markdown-viewer.js',
  './author.js',

  './manifest.webmanifest',
  './icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isNavigationRequest(req) {
  return req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');
}

// Stale-while-revalidate for static assets, network-first for navigations
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isNavigationRequest(req)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(req);
          return cached || cache.match('./index.html');
        })
    );
    return;
  }

  // assets: stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          // avoid caching opaque / error
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
