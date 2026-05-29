<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const activeIndex = ref(null)
const totalImages = 16

const openViewer = (index) => {
  activeIndex.value = index
  document.body.style.overflow = 'hidden' // prevent body scrolling
}

const closeViewer = () => {
  activeIndex.value = null
  document.body.style.overflow = ''
}

const prevImage = () => {
  if (activeIndex.value !== null) {
    activeIndex.value = (activeIndex.value - 1 + totalImages) % totalImages
  }
}

const nextImage = () => {
  if (activeIndex.value !== null) {
    activeIndex.value = (activeIndex.value + 1) % totalImages
  }
}

const downloadImage = (url) => {
  window.open(url, '_blank')
}

// Handle keyboard arrows
const handleKeyDown = (e) => {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') closeViewer()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="images-page">
    <!-- Gallery Header -->
    <header class="gallery-header">
      <h1 class="gallery-title">HVX Pro Gallery</h1>
      <p class="gallery-subtitle">High-fidelity imagery for designers, developers, and creators</p>
    </header>

    <!-- Advertisement & Promotion Banner -->
    <div class="ad-space-container">
      <PromotionalBanner layout="horizontal" />
    </div>

    <!-- Image Grid with In-Feed Ads -->
    <div class="image-grid">
      <template v-for="i in totalImages" :key="i">
        <div 
          class="image-card"
          @click="openViewer(i - 1)"
        >
          <img
            :src="`https://picsum.photos/seed/${i + 50}/800/800`"
            alt="Gallery Image"
            loading="lazy"
            class="gallery-thumbnail"
          />
          <div class="image-overlay">
            <div class="overlay-info">
              <span class="img-title">Curated Shot #{{ i }}</span>
              <span class="img-author">by HVX Pro</span>
            </div>
            <button class="icon-btn" @click.stop="downloadImage(`https://picsum.photos/seed/${i + 50}/1200/1200`)">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="currentColor"
                stroke-width="2.5"
                fill="none"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- In-grid Image Ad 1 after 4th image -->
        <div v-if="i === 4" class="image-grid-ad">
          <PromotionalBanner layout="grid-item" :campaign="2" />
        </div>

        <!-- In-grid Image Ad 2 after 10th image -->
        <div v-if="i === 10" class="image-grid-ad">
          <PromotionalBanner layout="grid-item" :campaign="3" />
        </div>
      </template>
    </div>

    <!-- Interactive Lightbox Viewer -->
    <Transition name="fade">
      <div v-if="activeIndex !== null" class="lightbox-overlay" @click.self="closeViewer">
        <!-- Close Button -->
        <button class="lightbox-close" @click="closeViewer" aria-label="Close viewer">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <!-- Navigation Buttons -->
        <button class="lightbox-nav nav-prev" @click="prevImage" aria-label="Previous image">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div class="lightbox-content">
          <img 
            :src="`https://picsum.photos/seed/${activeIndex + 51}/1200/1200`" 
            alt="Fullscreen View" 
            class="lightbox-image" 
          />
          
          <div class="lightbox-meta">
            <div class="meta-left">
              <h3>Creative Shot #{{ activeIndex + 1 }}</h3>
              <p>Curated Collection &bull; 1200 x 1200 &bull; High Quality PNG</p>
            </div>
            <button class="download-btn-premium" @click="downloadImage(`https://picsum.photos/seed/${activeIndex + 51}/1200/1200`)">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download Raw</span>
            </button>
          </div>
        </div>

        <button class="lightbox-nav nav-next" @click="nextImage" aria-label="Next image">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.images-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;
  padding-bottom: 3rem;
}

.gallery-header {
  text-align: center;
  padding: 1.5rem 0 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.gallery-title {
  font-size: 1.85rem;
  font-weight: 855;
  letter-spacing: -0.03em;
  margin: 0;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gallery-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0;
}

/* Advertisement Space */
.ad-space-container {
  margin-bottom: 0.5rem;
}

/* Image Grid */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

.image-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.image-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  border-color: rgba(99, 102, 241, 0.3);
}

.gallery-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.image-card:hover .gallery-thumbnail {
  transform: scale(1.04);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(10, 15, 29, 0.9));
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.overlay-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.img-title {
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 600;
}

.img-author {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: var(--accent-gradient);
  transform: scale(1.05);
}

/* Lightbox Modal */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(6, 9, 17, 0.96);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.lightbox-close {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1010;
  transition: all 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: rotate(90deg);
}

.lightbox-nav {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1010;
  flex-shrink: 0;
}

.lightbox-nav:hover {
  background: var(--accent-gradient);
  border-color: transparent;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;
  height: 100%;
  z-index: 1005;
}

.lightbox-image {
  max-height: 70vh;
  max-width: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes zoomIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.lightbox-meta {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  backdrop-filter: blur(10px);
}

.meta-left h3 {
  margin: 0 0 4px 0;
  font-size: 1.15rem;
  font-weight: 700;
}

.meta-left p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.download-btn-premium {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-gradient);
  color: white;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.download-btn-premium:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive grid & layout tweaks */
@media (min-width: 640px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
  
  .lightbox-meta {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

@media (min-width: 1024px) {
  .images-page {
    padding: 1rem 0;
  }
  
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .lightbox-nav {
    display: none !important; /* Hide arrows on mobile; can swipe or tap overlay to close */
  }
}

.image-grid-ad {
  grid-column: span 1;
  display: flex;
  align-items: stretch;
}

@media (min-width: 480px) {
  .image-grid-ad {
    grid-column: span 2;
  }
}
</style>
