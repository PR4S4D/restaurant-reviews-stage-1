importScripts('./js/cache-polyfill.js')

var CACHE_NAME = "restaurant-review-cache-2";
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
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  '/img/1_1x.jpg',
  '/img/2_1x.jpg',
  '/img/3_1x.jpg',
  '/img/4_1x.jpg',
  '/img/5_1x.jpg',
  '/img/6_1x.jpg',
  '/img/7_1x.jpg',
  '/img/8_1x.jpg',
  '/img/9_1x.jpg',
  '/img/10_1x.jpg',
  '/img/1_2x.jpg',
  '/img/2_2x.jpg',
  '/img/3_2x.jpg',
  '/img/4_2x.jpg',
  '/img/5_2x.jpg',
  '/img/6_2x.jpg',
  '/img/7_2x.jpg',
  '/img/8_2x.jpg',
  '/img/9_2x.jpg',
  '/img/10_2x.jpg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(urlsToCache);
  }));
});

//Ref: https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    // Cache hit - return response
    if (response) {
      return response;
    }

    var fetchRequest = event
      .request
      .clone();

    return fetch(fetchRequest).then(function (response) {
      // Check if we received a valid response
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      var responseToCache = response.clone();

      caches
        .open(CACHE_NAME)
        .then(function (cache) {
          cache.put(event.request, responseToCache);
        });

      return response;
    });
  }));
});