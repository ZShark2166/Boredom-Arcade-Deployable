importScripts('/static/math/math.sw.js');
importScripts('https://arc.io/arc-sw-core.js');

const sw = new MathServiceWorker();

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
