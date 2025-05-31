const CACHE_NAME = 'noor-beauty-cache-v1';
const urlsToCache = [
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  'lipstick.jpeg',
  // أضف باقي الصور أو الصفحات حسب الحاجة
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
