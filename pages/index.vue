<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="badge">Next-Gen PWA</div>
      <h1 class="hero-title">Experience the Speed of Nuxt 3 & PWA</h1>
      <p class="hero-subtitle">
        A seamless integration of modern web capabilities with native-like desktop and mobile app user experiences. Installable, fast, and offline-capable.
      </p>
      <div class="hero-cta">
        <button class="btn btn-primary">Explore Docs</button>
        <button class="btn btn-secondary">Install App</button>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features-section">
      <h2 class="section-title">Key Capabilities</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Ultra Fast</h3>
          <p>Optimized bundle sizes, server-side rendering, and smart pre-fetching for instant loads.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌐</div>
          <h3>Offline Support</h3>
          <p>Workbox-powered service workers cache assets automatically so your app works anywhere, anytime.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Installable</h3>
          <p>Add to home screen prompts configure automatically via webapp manifest definitions.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem 0;
}

.hero-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

.badge {
  display: inline-block;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  background: linear-gradient(to right, #ffffff, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  font-size: 0.95rem;
}
</style>
