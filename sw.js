/* CHHOYED service worker: lets the site work without internet.

   THE RULE: the internet always wins. When the visitor is online, every page, lesson and data file is
   fetched fresh from the server (and a copy is saved). The saved copy is used ONLY when the network fails.
   So students never see an old lesson while they are online, and lessons they opened before still open offline.

   Images are served from the saved copy first (they rarely change), then refreshed in the background.

   When you change THIS file (for example the list of shell files), also change VERSION below.
   For normal lesson or design changes you do not need to touch anything. */
const VERSION = 'v1';
const CACHE = 'chhoyed-' + VERSION;

const SHELL = [
  './', 'index.html', 'manifest.webmanifest',
  'css/style.css',
  'js/app.js', 'js/i18n.js', 'js/tryit.js', 'js/helpful.js', 'js/reader.js', 'js/playground.js', 'js/page.js',
  'js/vendor/marked.min.js', 'js/vendor/purify.min.js', 'js/vendor/highlight.min.js', 'js/vendor/atom-one-dark.min.css',
  'data/subjects.json', 'data/posts.json', 'data/teachers.json', 'data/roadmap.json',
  'images/logo.svg', 'images/icon-192.png'
];

const abs = p => new URL(p, self.registration.scope).href;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // one by one, so one missing file cannot stop the whole install
    await Promise.allSettled(SHELL.map(p => cache.add(new Request(abs(p), { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('chhoyed-') && k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req, { cache: 'no-cache' });
    if (res && res.status === 200 && res.type !== 'opaque') cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === 'navigate') {                                   // an unknown page while offline: show the app
      const shell = await cache.match(abs('index.html'));
      if (shell) return shell;
    }
    return new Response('You are offline, and this page was not saved yet.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function imageFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const refresh = fetch(req).then(res => { if (res && res.status === 200) cache.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await refresh) || new Response('', { status: 504 });
}

async function fontsSWR(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const refresh = fetch(req).then(res => { if (res && (res.status === 200 || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await refresh) || new Response('', { status: 504 });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    if (/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname)) e.respondWith(fontsSWR(req));
    return;                                                         // everything else (analytics, forms) goes straight to the network
  }
  if (url.pathname.endsWith('/sw.js') || url.pathname.indexOf('/files/') >= 0) return;   // never keep the worker itself or big PDFs
  if (url.pathname.indexOf('/images/') >= 0) { e.respondWith(imageFirst(req)); return; }
  e.respondWith(networkFirst(req));
});

// "Save lessons for offline use": the page sends a message, and we save every lesson and practice file.
self.addEventListener('message', e => {
  if (e.data === 'precache-all') e.waitUntil(precacheAll(e.source));
});

async function precacheAll(client) {
  const say = m => { if (client) client.postMessage(m); };
  try {
    const cache = await caches.open(CACHE);
    const [posts, subjects] = await Promise.all([
      fetch(abs('data/posts.json'), { cache: 'no-cache' }).then(r => r.json()),
      fetch(abs('data/subjects.json'), { cache: 'no-cache' }).then(r => r.json())
    ]);
    const files = new Set(SHELL.map(abs));
    posts.forEach(p => { if (p.contentFile) files.add(abs(p.contentFile)); });
    subjects.forEach(s => (s.topics || []).forEach(t => { if (t.exercises) files.add(abs(t.exercises)); }));
    const list = [...files];
    let done = 0, failed = 0;
    say({ type: 'precache-progress', done, total: list.length });
    for (let i = 0; i < list.length; i += 6) {
      await Promise.all(list.slice(i, i + 6).map(async u => {
        try { const r = await fetch(u, { cache: 'no-cache' }); if (r.ok) await cache.put(u, r); else failed++; } catch { failed++; }
        done++;
      }));
      say({ type: 'precache-progress', done, total: list.length });
    }
    say({ type: 'precache-done', failed, total: list.length });
  } catch (err) {
    say({ type: 'precache-done', failed: -1, total: 0 });
  }
}
