this.addEventListener('install', function(event) {
  console.log('installing...');
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/app/index.html',
        '/app/css/styles.css'
      ]);
    })
  );
});


this.addEventListener('activate', event => {
  console.log('activated', event);
});

this.addEventListener('statechange', event => {
  console.log('statechange', event);
});

this.addEventListener('fetch', event => {
  console.log('fetch', event.request.url);
})