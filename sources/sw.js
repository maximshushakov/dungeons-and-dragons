this.addEventListener('install', function(event) {
  console.log('installing...');
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/css/style.css',
        '/js/app.js',
      ]);
    })
  );
});


this.addEventListener('activate', event => {
  console.log('activated');
});

this.addEventListener('fetch', event => {
  console.log('fetch');
})