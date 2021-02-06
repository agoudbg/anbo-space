// self.addEventListener('fetch', function (e) {

//     console.log('现在正在请求：' + e.request.url);

// });

self.addEventListener("fetch", async event => {
    const req = event.request;
    const url = new URL(req.url);
  
    if (url.origin === location.origin) {
      event.respondWith(cacheFirst(req));
    } else {
      event.respondWith(networkFirst(req));
    }
  });
  
  async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
  }
  
  async function networkFirst(req) {
    const cache = await caches.open("topics-dynamic");
    try {
      const res = await fetch(req);
      cache.put(req, res.clone());
      return res;
    } catch (error) {
      return await cache.match(req);
    }
  }

  