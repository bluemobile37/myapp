'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/index.html": "61b7719527881ef63ebfbdfb6c63c83d",
"/main.dart.js": "0d19c1cab444dd10e29a26e2e8e9b860",
"/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"/manifest.json": "90429e89de58cfca8f025ed8b460774a",
"/assets/LICENSE": "1a80be6c5724a31e6f9c9e06dba53b63",
"/assets/AssetManifest.json": "7eb9dfcaff4e885c6787a903979ddb2c",
"/assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/assets/juqi.jpg": "8329ed2202d8d76679f4bed9c79a06bc"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
