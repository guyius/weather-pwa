  if ('function' === typeof importScripts) {
    importScripts(
      'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
    );
    if (workbox) {
      console.log('Workbox is loaded');
      workbox.precaching.precacheAndRoute([]);
   
      workbox.routing.registerNavigationRoute('/index.html', {
        blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
      });
   
      workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg)$/,
        workbox.strategies.cacheFirst({
          cacheName: 'images',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
          ],
        })
      );

      window.addEventListener('fetch', async (event) => {
        if (event.request.url.endsWith('/complexRequest')) {
          // Configure the strategy in advance.
          const strategy = new workbox.strategies.StaleWhileRevalidate({cacheName: 'api-cache'});
      
          // Make two requests using the strategy.
          // Because we're passing in event, event.waitUntil() will be called automatically.
          const firstPromise = strategy.makeRequest({event, request: 'https://example.com/api1'});
          const secondPromise = strategy.makeRequest({event, request: 'https://example.com/api2'});
      
          const [firstResponse, secondResponse] = await Promise.all(firstPromise, secondPromise);
          const [firstBody, secondBody] = await Promise.all(firstResponse.text(), secondResponse.text());
      
          // Assume that we just want to concatenate the first API response with the second to create the
          // final response HTML.
          const compositeResponse = new Response(firstBody + secondBody, {
            headers: {'content-type': 'text/html'},
          });
      
          event.respondWith(compositeResponse);
        }
      });
   
  } else {
      console.log('Workbox could not be loaded. No Offline support');
    }
  }
  