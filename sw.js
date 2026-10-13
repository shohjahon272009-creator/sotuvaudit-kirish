// Ilova o'rnatilishi uchun minimal service worker. url.txt har doim tarmoqdan (manzil o'zgarishi mumkin).
const CACHE = 'kirish-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.pathname.endsWith('/url.txt') || url.origin !== location.origin) return;  // har doim tarmoq
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
