const CACHE_NAME = "vitality-compass-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
  "/favicon.svg",
  "/og-image.png",
  "/logo-primary.svg",
  "/logo-header-lockup.svg",
];

// ── Install: cache the app shell ──────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ── Activate: clean up old caches ─────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ── Fetch: cache-first for static assets, network-first for pages ─────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Cache-first for static assets (images, fonts, JS, CSS, videos)
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font" ||
    request.destination === "video" ||
    request.destination === "audio" ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|mp3|woff2?|css|js)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
        );
      })
    );
    return;
  }

  // Network-first for pages (HTML navigation)
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful page responses
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => {
        // Offline fallback: serve cached version or show minimal page
        return caches.match(request).then((cached) => {
          return (
            cached ||
            new Response(
              `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vitality Compass — Offline</title>
  <meta name="theme-color" content="#0A6E6A">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0A6E6A; color: #fff; text-align: center; padding: 2rem; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { opacity: 0.8; }
  </style>
</head>
<body>
  <div>
    <h1>You're offline</h1>
    <p>Connect to the internet to access Vitality Compass.</p>
  </div>
</body>
</html>`,
              {
                headers: { "Content-Type": "text/html; charset=utf-8" },
              }
            )
          );
        });
      })
  );
});