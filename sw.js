const version = 'v1.0.2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/',
        '/css/app.css',
        '/js/app.js',
        '/logo.png',
      ]);
    }).catch(err => console.log(err))
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.match('/api/') || event.request.url.match('/js/') || event.request.url.match('/symbols/')) {
   event.respondWith(
    caches.open(version).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
   )
  }
});