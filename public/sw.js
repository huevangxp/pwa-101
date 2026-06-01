import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

self.skipWaiting()
clientsClaim()

// Workbox handles the offline caching
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// --- PUSH NOTIFICATION LOGIC ---

// 1. Listen for the push event
self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  const data = event.data?.json() ?? {}
  const title = data.title || 'New Notification'
  const options = {
    body: data.body || 'You have a new message.',
    icon: '/icon.png',
    badge: '/badge.png',
    data: data.url // Store a URL to open on click
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// 2. Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const targetUrl = event.notification.data || '/'

  // Open the window or focus it if it's already open
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl)
      }
    })
  )
})
