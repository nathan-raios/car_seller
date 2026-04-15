// Placeholder service worker for Firebase Messaging.
// Add Firebase Messaging handling here if you enable push notifications.

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(self.clients.claim());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
