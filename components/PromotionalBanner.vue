<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  layout: {
    type: String,
    default: 'horizontal' // 'horizontal', 'compact', 'card', 'grid-item'
  },
  campaign: {
    type: [String, Number],
    default: 1 // 1: PWA, 2: Dev Gear, 3: Creator Stock
  }
})

const pwaEvent = useState('pwaEvent', () => null)
const isInstalled = ref(false)
const showBanner = ref(true)

// Campaign Data with rich product imagery
const campaignData = computed(() => {
  const campaigns = {
    1: {
      badge: 'HVX Pro PWA',
      title: 'Experience Next-Gen Video Streaming',
      desc: 'Install the HVX Pro app on your device for lightning-fast speeds, offline playback, and a clean mobile-first workspace.',
      promoImg: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=400&q=80',
      actionText: 'Install App',
      url: '#install',
      isPwa: true
    },
    2: {
      badge: 'Sponsored by DevGear',
      title: 'Upgrade Your Workspace Setup',
      desc: 'Get 15% off ergonomic mechanical keyboards, high-refresh monitors, and premium desk accessories designed for creators.',
      promoImg: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&h=400&q=80',
      actionText: 'Shop Setup',
      url: '#shop',
      isPwa: false
    },
    3: {
      badge: 'Sponsor: PixelAssets',
      title: 'Unleash Your Creative Potential',
      desc: 'Access thousands of high-resolution stock photos, mockup templates, and UI assets for your next viral project.',
      promoImg: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&h=400&q=80',
      actionText: 'Download Assets',
      url: '#download',
      isPwa: false
    }
  }
  return campaigns[props.campaign] || campaigns[1]
})

const triggerAction = async () => {
  if (campaignData.value.isPwa) {
    if (pwaEvent.value) {
      pwaEvent.value.prompt()
      const { outcome } = await pwaEvent.value.userChoice
      if (outcome === 'accepted') {
        pwaEvent.value = null
        isInstalled.value = true
      }
    } else {
      alert("To install HVX Pro, tap the Share button in your browser and select 'Add to Home Screen'.")
    }
  } else {
    window.open(campaignData.value.url, '_blank')
  }
}
</script>

<template>
  <div v-if="showBanner" :class="['promo-banner', `layout-${layout}`, `campaign-${campaign}`]">
    <!-- Close Button -->
    <button class="close-btn" @click="showBanner = false" aria-label="Dismiss advertisement">
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <div class="promo-grid-container">
      <!-- Left: Copy & Call to Action -->
      <div class="promo-text-column">
        <div class="promo-badge">
          <span class="badge-dot" :style="{ backgroundColor: campaign === 1 ? '#6366f1' : '#a855f7' }"></span>
          <span>{{ campaignData.badge }}</span>
        </div>
        
        <h2 class="promo-title">
          {{ campaignData.title }}
        </h2>
        
        <p class="promo-description">
          {{ campaignData.desc }}
        </p>

        <button class="promo-action-btn" @click="triggerAction">
          <span>{{ campaignData.actionText }}</span>
          <svg v-if="campaignData.isPwa" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>

      <!-- Right: Graphical Image Promotion -->
      <div class="promo-image-column">
        <div class="image-glow-ring"></div>
        <img :src="campaignData.promoImg" :alt="campaignData.title" class="promo-graphic-img" />
      </div>
    </div>

    <!-- Shimmer Overlay effect -->
    <div class="shimmer-overlay"></div>
  </div>
</template>

<style scoped>
.promo-banner {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, rgba(20, 24, 45, 0.95) 0%, rgba(10, 12, 22, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.25rem;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 45px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}

.promo-grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .promo-grid-container {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 2.5rem;
  }
}

.promo-text-column {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
}

.promo-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #c7d2fe;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.promo-title {
  margin: 0;
  font-size: 1.65rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.promo-description {
  margin: 0 0 0.5rem 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.promo-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-gradient);
  color: white;
  border: none;
  padding: 0.65rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 18px -2px rgba(99, 102, 241, 0.45);
}

.promo-action-btn:hover {
  transform: translateY(-1.5px);
  box-shadow: 0 8px 24px -2px rgba(99, 102, 241, 0.65);
}

/* Image Visual Column */
.promo-image-column {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
}

.promo-graphic-img {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  transform: perspective(1000px) rotateY(-8deg) rotateX(4deg);
  transition: all 0.5s ease;
}

.promo-banner:hover .promo-graphic-img {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.03);
}

.image-glow-ring {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%);
  filter: blur(10px);
  z-index: -1;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  cursor: pointer;
  z-index: 10;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
}

/* Compact layout override (e.g. watchlist, simple banner) */
.promo-banner.layout-compact {
  padding: 1.25rem 1.5rem;
}

.promo-banner.layout-compact .promo-title {
  font-size: 1.2rem;
}

.promo-banner.layout-compact .promo-description {
  font-size: 0.82rem;
  max-width: 100%;
}

/* Card layout (e.g. sidebar) */
.promo-banner.layout-card {
  padding: 1.5rem;
}

.promo-banner.layout-card .promo-grid-container {
  grid-template-columns: 1fr;
}

.promo-banner.layout-card .promo-graphic-img {
  max-width: 100%;
  transform: none;
  aspect-ratio: 16 / 10;
}

/* Grid-Item layout (e.g. in index/images grid feeds) */
.promo-banner.layout-grid-item {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.promo-banner.layout-grid-item .promo-grid-container {
  grid-template-columns: 1fr;
  height: 100%;
}

.promo-banner.layout-grid-item .promo-graphic-img {
  display: none; /* Hide visual column inside standard grid cards to avoid double image cards */
}

.promo-banner.layout-grid-item .promo-title {
  font-size: 1.15rem;
}

.promo-banner.layout-grid-item .promo-description {
  font-size: 0.78rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.promo-banner.layout-grid-item .promo-action-btn {
  padding: 0.5rem 1rem;
  font-size: 0.78rem;
}

/* Shimmer animation */
.shimmer-overlay {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  animation: shimmer 8s infinite linear;
  pointer-events: none;
  z-index: 2;
}

@keyframes shimmer {
  0% { left: -150%; }
  100% { left: 150%; }
}

@media (max-width: 768px) {
  .promo-banner {
    padding: 1.5rem;
  }
  
  .promo-grid-container {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .promo-image-column {
    display: flex !important;
    justify-content: center;
    width: 100%;
  }

  .promo-graphic-img {
    max-width: 100%;
    max-height: 140px;
    object-fit: cover;
    transform: none !important;
  }
  
  .promo-title {
    font-size: 1.35rem;
  }
}
</style>
