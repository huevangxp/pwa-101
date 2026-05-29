<template>
  <div class="layout-container">
    <!-- Modern Header -->
    <header class="app-header">
      <div class="header-content">
        <div class="brand">
          <span class="brand-logo">⚡</span>
          <span class="brand-name">Nuxt PWA Hub</span>
        </div>
        <nav class="nav-menu">
          <NuxtLink to="/" class="nav-item">Home</NuxtLink>
          <a href="#" class="nav-item">Features</a>
          <a href="#" class="nav-item">About</a>
        </nav>
        <div class="header-actions">
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2026 Nuxt PWA Hub. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  --bg-primary: #0a0f1d;
  --bg-secondary: rgba(255, 255, 255, 0.03);
  --bg-header: rgba(10, 15, 29, 0.7);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-color: #6366f1;
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  --border-color: rgba(255, 255, 255, 0.08);
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  height: 70px;
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
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  font-size: 1.5rem;
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

.nav-item:hover, .nav-item.router-link-active {
  color: var(--text-primary);
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

.main-content {
  flex: 1;
  margin-top: 70px;
  padding: 2rem;
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
</style>
