// Meditech Laboratory service worker: pages network-first with offline fallback, static assets stale-while-revalidate.
const VERSION = 'meditech-v3'
const CORE = ['/', '/tests', '/preparation', '/book', '/contact', '/doctors', '/app', '/offline', '/css/style.css', '/js/app.js', '/js/tests-data.js', '/js/tests.js', '/js/book.js', '/js/contact.js', '/images/logo.png', '/images/icon-192.png', '/manifest.webmanifest']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()))
})
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()))
})
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(url.pathname, copy)); return res })
        .catch(async () => (await caches.match(url.pathname)) || (await caches.match('/offline')))
    )
    return
  }
  const sameOrigin = url.origin === location.origin
  const fonts = url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')
  if (!sameOrigin && !fonts) return
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)) } return res }).catch(() => hit)
      return hit || net
    })
  )
})
