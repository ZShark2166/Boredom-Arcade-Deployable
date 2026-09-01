importScripts("/static/math/math.sw.js");

const sw = new MathServiceWorker();

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));
