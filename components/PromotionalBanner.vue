<script setup>
import { ref } from 'vue'

const props = defineProps({
  layout: {
    type: String,
    default: 'horizontal' // 'horizontal', 'compact', 'card'
  }
})

const pwaEvent = useState('pwaEvent', () => null)
const isInstalled = ref(false)
const showBanner = ref(true)

const triggerInstall = async () => {
  if (pwaEvent.value) {
    pwaEvent.value.prompt()
    const { outcome } = await pwaEvent.value.userChoice
    if (outcome === 'accepted') {
      pwaEvent.value = null
      isInstalled.value = true
    }
  } else {
    // Fallback if not installable (e.g. iOS or already installed)
    alert("To install HVX Pro, tap the Share button in your browser and select 'Add to Home Screen'.")
  }
}
</script>

<template>
  <div v-if="showBanner" :class="['promo-banner', `layout-${layout}`]">
    <!-- Close Button -->
    <button class="close-btn" @click="showBanner = false" aria-label="Dismiss banner">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <!-- Banner Content -->
    <div class="promo-content">
      <div class="promo-badge">
        <span class="badge-dot"></span>
        <span>HVX Pro Official</span>
      </div>
      
      <h2 class="promo-title">
        Experience the Next Generation PWA
      </h2>
      
      <p class="promo-description">
        Install HVX Pro on your device for lightning-fast speeds, offline playback, and zero compromises. Seamlessly integrated for desktop and mobile.
      </p>

      <div class="promo-features">
        <div class="feature-tag">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
          <span>Ultra Fast</span>
        </div>
        <div class="feature-tag">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>PWA Ready</span>
        </div>
        <div class="feature-tag">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Offline Friendly</span>
        </div>
      </div>

      <button class="promo-action-btn" @click="triggerInstall">
        <span>Install App</span>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      </button>
    </div>

    <!-- Decorative Glow Elements -->
    <div class="decor-glow-1"></div>
    <div class="decor-glow-2"></div>
  </div>
</template>

<style scoped>
.promo-banner {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, rgba(30, 27, 75, 0.4) 0%, rgba(17, 24, 39, 0.6) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 16px;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Compact version for sidebars */
.promo-banner.layout-compact {
  padding: 1.25rem;
}

.promo-banner.layout-compact .promo-title {
  font-size: 1.15rem;
}

.promo-banner.layout-compact .promo-description {
  font-size: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.promo-banner.layout-compact .promo-features {
  display: none;
}

/* Card version for watch sidebar */
.promo-banner.layout-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  z-index: 10;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.promo-content {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 800px;
}

.promo-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #c7d2fe;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #60a5fa;
  box-shadow: 0 0 8px #60a5fa;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(96, 165, 250, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
}

.promo-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.25;
}

.promo-description {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.promo-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.feature-tag svg {
  color: #a855f7;
}

.promo-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-gradient);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px -2px rgba(99, 102, 241, 0.4);
  margin-top: 0.5rem;
}

.promo-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -2px rgba(99, 102, 241, 0.6);
}

.promo-action-btn svg {
  transition: transform 0.2s ease;
}

.promo-action-btn:hover svg {
  transform: translateY(2px);
}

/* Background glows */
.decor-glow-1 {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%);
  top: -80px;
  right: -50px;
  z-index: 1;
  pointer-events: none;
}

.decor-glow-2 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%);
  bottom: -80px;
  left: 20%;
  z-index: 1;
  pointer-events: none;
}

@media (min-width: 640px) {
  .promo-banner {
    padding: 2.5rem;
  }
  
  .promo-title {
    font-size: 1.85rem;
  }
}
</style>
