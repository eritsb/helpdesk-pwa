const CACHE_NAME = "helpdesk-v1";

const ARQUIVOS_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./css/style.css",
    "./js/storage.js",
    "./js/api.js",
    "./js/camera.js",
    "./js/chamados.js",
    "./js/app.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARQUIVOS_CACHE))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(nomesCaches => {
            return Promise.all(
                nomesCaches
                    .filter(nome => nome !== CACHE_NAME)
                    .map(nome => caches.delete(nome))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(respostaCache => {
                return respostaCache || fetch(event.request);
            })
    );
});