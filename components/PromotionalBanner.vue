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

// Campaign Data with rich imagery and copy
const campaignData = computed(() => {
  const campaigns = {
    1: {
      badge: 'HVX Pro PWA',
      title: 'Experience Next-Gen Video Streaming',
      desc: 'Install the HVX Pro app on your device for lightning-fast speeds, offline playback, and a clean mobile-first workspace.',
      bgImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Install App',
      url: '#install',
      isPwa: true
    },
    2: {
      badge: 'Sponsored by DevGear',
      title: 'Upgrade Your Workspace Setup',
      desc: 'Get 15% off ergonomic mechanical keyboards, high-refresh monitors, and premium desk accessories designed for creators.',
      bgImg: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Shop Setup',
      url: '#shop',
      isPwa: false
    },
    3: {
      badge: 'Sponsor: PixelAssets',
      title: 'Unleash Your Creative Potential',
      desc: 'Access thousands of high-resolution stock photos, mockup templates, and UI assets for your next viral project.',
      bgImg: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80',
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
    // Open campaign sponsor link
    window.open(campaignData.value.url, '_blank')
  }
}
</script>

<template>
  <div 
    v-if="showBanner" 
    :class="['promo-banner', `layout-${layout}`, `campaign-${campaign}`]"
    :style="{ backgroundImage: `linear-gradient(to right, rgba(10, 15, 29, 0.95) 45%, rgba(10, 15, 29, 0.5) 100%), url(${campaignData.bgImg})` }"
  >
    <!-- Close Button -->
    <button class="close-btn" @click="showBanner = false" aria-label="Dismiss advertisement">
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <!-- Banner Content -->
    <div class="promo-content">
      <div class="promo-badge">
        <span class="badge-dot" :style="{ backgroundColor: campaign === 1 ? '#60a5fa' : '#34d399' }"></span>
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

    <!-- Shimmer Overlay effect -->
    <div class="shimmer-overlay"></div>
  </div>
</template>

<style scoped>
.promo-banner {
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2.25rem;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 12px 35px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 180px;
}

/* Compact layout style */
.promo-banner.layout-compact {
  padding: 1.25rem 1.5rem;
  min-height: 140px;
  border-radius: 12px;
}

.promo-banner.layout-compact .promo-title {
  font-size: 1.15rem;
  margin-bottom: 0.25rem;
}

.promo-banner.layout-compact .promo-description {
  font-size: 0.8rem;
  max-width: 90%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card layout style */
.promo-banner.layout-card {
  padding: 1.5rem;
  min-height: 220px;
  border-radius: 12px;
}

.promo-banner.layout-card .promo-title {
  font-size: 1.2rem;
}

.promo-banner.layout-card .promo-description {
  font-size: 0.85rem;
  line-height: 1.4;
}

/* Grid-Item layout style (embedded inside feeds) */
.promo-banner.layout-grid-item {
  padding: 1.5rem;
  aspect-ratio: 16 / 9;
  justify-content: flex-end;
  border-radius: 12px;
  min-height: auto;
}

.promo-banner.layout-grid-item .promo-content {
  max-width: 100%;
}

.promo-banner.layout-grid-item .promo-title {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.promo-banner.layout-grid-item .promo-description {
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.promo-banner.layout-grid-item .promo-action-btn {
  padding: 0.4rem 0.9rem;
  font-size: 0.75rem;
}

.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(10, 15, 29, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  cursor: pointer;
  z-index: 10;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.close-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  color: var(--text-primary);
  border-color: rgba(99, 102, 241, 0.4);
}

.promo-content {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  max-width: 65%; /* Constrain text width on wide banners so background image is visible */
}

.layout-card .promo-content,
.layout-compact .promo-content,
.layout-grid-item .promo-content {
  max-width: 100%;
}

.promo-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(10, 15, 29, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 3px 8px;
  border-radius: 50px;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(4px);
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}

.promo-title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.promo-description {
  margin: 0 0 0.25rem 0;
  font-size: 0.88rem;
  line-height: 1.45;
  color: #cbd5e1;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.promo-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent-gradient);
  color: white;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px -2px rgba(99, 102, 241, 0.4);
}

.promo-action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px -2px rgba(99, 102, 241, 0.6);
}

/* Subtle moving shimmer to give it premium visual weight */
.shimmer-overlay {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 50%,
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

@media (max-width: 640px) {
  .promo-banner {
    padding: 1.5rem;
    min-height: 160px;
  }
  
  .promo-content {
    max-width: 100%;
  }
  
  .promo-title {
    font-size: 1.3rem;
  }
}
</style>
