importScripts('./js/cache-polyfill.js')

var CACHE_NAME = "restaurant-review-cache-ver-2";
var urlsToCache = [
  '/',
  'index.html',
  '/restaurant.html',
  '/js',
  '/css/styles.css',
  '/css/responsive.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/cache-polyfill.js',
  '/data/restaurants.json',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
  }));
});