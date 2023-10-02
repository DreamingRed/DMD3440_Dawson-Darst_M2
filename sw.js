// Name of our cache
const cacheName = 'cacheMoney'

// Bad image links - replaced with picsum.
// Oof. 
const urlsToCache = [
    "index.html",
    "/",
    "gallery.html",
    "style.css",
    "https://picsum.photos/200",
  ];

self.addEventListener("install", event => {
   event.waitUntil(
      caches.open(cacheName)
      .then(cache => {
         return cache.addAll(urlsToCache)
      })
   )
})

self.addEventListener("fetch", event => {
   event.respondWith(
     caches.match(event.request)
     .then(cachedResponse => {
	   // It can update the cache to serve updated content on the next request
         console.log(`${cachedResponse} retrieved.`)
         return cachedResponse || fetch(event.request);
     }
   )
  )
});