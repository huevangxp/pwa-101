<script setup>
import { onMounted, onBeforeUnmount } from "vue";

const pwaEvent = useState("pwaEvent", () => null);

let periodicTimer = null;

const triggerPeriodicNotification = async () => {
  if (!process.client || !('Notification' in window) || Notification.permission !== 'granted') return;
  
  const title = "Start Pro Channel Update 🔔";
  const options = {
    body: "Start Pro App just posted a new tutorial! Watch now to learn advanced PWA development features.",
    icon: "/pwa-192x192.png",
    badge: "/favicon.ico",
    vibrate: [200, 100, 200],
    tag: "start-pro-periodic",
    renotify: true,
    data: {
      url: window.location.origin + "/profile"
    }
  };

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg) {
        await reg.showNotification(title, options);
        return;
      }
    }
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
    };
  } catch (e) {
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
    };
  }
};

const startPeriodicNotifications = () => {
  if (periodicTimer) clearInterval(periodicTimer);
  
  // Set up the interval (every 5 seconds = 5 * 1000 = 5,000 ms)
  periodicTimer = setInterval(() => {
    triggerPeriodicNotification();
  }, 5 * 1000);
  
  console.log("Start Pro PWA: 5-second periodic notification timer started.");
};

onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent default prompt from triggering automatically
    e.preventDefault();
    // Stash the event so other components can trigger it
    pwaEvent.value = e;
    console.log("Start Pro PWA: beforeinstallprompt stashed");
  });

  // Start periodic timer if permission is already granted
  if (process.client && 'Notification' in window && Notification.permission === 'granted') {
    startPeriodicNotifications();
  }

  // Listen for enabling event from homepage permission prompt modal
  window.addEventListener('start-pro-notifications-enabled', () => {
    startPeriodicNotifications();
  });
  
  // Recheck on focus to capture permissions granted in browser settings
  window.addEventListener('focus', () => {
    if (process.client && 'Notification' in window && Notification.permission === 'granted' && !periodicTimer) {
      startPeriodicNotifications();
    }
  });
});

onBeforeUnmount(() => {
  if (periodicTimer) {
    clearInterval(periodicTimer);
    periodicTimer = null;
  }
});
</script>

<template>
  <div class="layout-container">
    <!-- Modern Header -->
    <header class="app-header">
      <div class="header-content">
        <div class="brand">
          <span class="brand-logo">⚡</span>
          <span class="brand-name">Start Pro</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="nav-menu desktop-only">
          <NuxtLink to="/" class="nav-item">Home</NuxtLink>
          <NuxtLink to="/images" class="nav-item">Images</NuxtLink>
          <NuxtLink to="/profile" class="nav-item">Profile</NuxtLink>
        </nav>

        <div class="header-actions">
          <!-- Mobile Header Icons (Search & Profile like YouTube) -->
          <button class="btn-icon mobile-only">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <NuxtLink to="/profile" class="btn-icon profile-icon mobile-only">
            <img src="https://i.pravatar.cc/100?img=68" alt="Profile" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer (Desktop only) -->
    <footer class="app-footer desktop-only">
      <div class="footer-content">
        <p>&copy; 2026 Nuxt PWA Hub. All rights reserved.</p>
      </div>
    </footer>

    <!-- Mobile Bottom Navigation (YouTube style) -->
    <nav class="bottom-nav mobile-only">
      <NuxtLink to="/" class="bottom-nav-item">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Home</span>
      </NuxtLink>
      <a href="#" class="bottom-nav-item">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span>Features</span>
      </a>
      <NuxtLink to="/images" class="bottom-nav-item">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>Images</span>
      </NuxtLink>
      <NuxtLink to="/profile" class="bottom-nav-item">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>You</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");

:root {
  --bg-primary: #0a0f1d;
  --bg-secondary: rgba(255, 255, 255, 0.03);
  --bg-header: rgba(10, 15, 29, 0.95);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-color: #6366f1;
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  --border-color: rgba(255, 255, 255, 0.08);
}

body {
  margin: 0;
  padding: 0;
  font-family:
    "Plus Jakarta Sans",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--bg-header);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-logo {
  font-size: 1.25rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.brand-name {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(to right, #ffffff, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.925rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--accent-gradient);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.btn-icon {
  background: transparent;
  border: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  cursor: pointer;
}

.profile-icon img {
  border-radius: 50%;
  width: 28px;
  height: 28px;
}

.main-content {
  flex: 1;
  margin-top: 60px;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
}

.app-footer {
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
  margin-top: 4rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.mobile-only {
  display: none !important;
}

/* Mobile & Tablet Styles (YouTube-like layout) */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .main-content {
    padding: 1rem 1rem 5rem 1rem; /* Extra padding at bottom for nav bar */
  }

  .header-content {
    padding: 0 1rem;
  }

  /* Bottom Navigation Bar */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 65px;
    background-color: var(--bg-header);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    padding-bottom: env(safe-area-inset-bottom); /* iOS safe area */
  }

  .bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    text-decoration: none;
    gap: 4px;
    flex: 1;
  }

  .bottom-nav-item span {
    font-size: 0.65rem;
    font-weight: 500;
  }

  .bottom-nav-item:hover,
  .bottom-nav-item.router-link-active {
    color: var(--text-primary);
  }
}
</style>
