<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const showPopupAd = ref(false);
const pwaEvent = useState("pwaEvent");

const promoImages = [
  'https://hvx.vn/images/promotion.png',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=300&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=300&q=80'
];

const currentSlide = ref(0);
let slideInterval = null;

onMounted(() => {
  // Show popup ad after 3 seconds of watching
  setTimeout(() => {
    showPopupAd.value = true;
  }, 3000);

  // Auto cycle banner slides
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % promoImages.length;
  }, 4000);
});

onBeforeUnmount(() => {
  if (slideInterval) clearInterval(slideInterval);
});

const triggerInstall = async () => {
  if (pwaEvent.value) {
    pwaEvent.value.prompt();
    const { outcome } = await pwaEvent.value.userChoice;
    if (outcome === "accepted") {
      pwaEvent.value = null;
    }
  } else {
    alert(
      "To install HVX Pro, tap the Share button in your browser and select 'Add to Home Screen'.",
    );
  }
  showPopupAd.value = false;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + promoImages.length) % promoImages.length;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % promoImages.length;
};

const setSlide = (idx) => {
  currentSlide.value = idx;
};
</script>

<template>
  <div class="watch-page">
    <div class="main-content">
      <!-- Video Player -->
      <div class="video-player-container">
        <iframe
          src="https://player.mediadelivery.net/embed/256380/d9d9ab1f-fc9f-4488-9c26-4ffc653c0024?autoplay=true&loop=false&muted=false"
          loading="lazy"
          style="
            border: 0;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          "
          allow="
            accelerometer;
            gyroscope;
            autoplay;
            encrypted-media;
            picture-in-picture;
          "
          allowfullscreen="true"
        >
        </iframe>
      </div>

      <!-- Video Details -->
      <div class="video-details">
        <h1 class="video-title">
          Building an amazing Nuxt 3 PWA App like YouTube from scratch - Part
          {{ $route.query.v || 1 }}
        </h1>

        <div class="video-primary-info">
          <div class="channel-info">
            <img
              :src="`https://i.pravatar.cc/100?img=${parseInt($route.query.v || 1) + 10}`"
              alt="Channel"
              class="channel-avatar"
            />
            <div class="channel-text">
              <h3 class="channel-name">Huevangxp Channel</h3>
              <p class="subscriber-count">1.2M subscribers</p>
            </div>
          </div>
        </div>

        <!-- Advertisement Space Promoting Our Website (Image Slideshow) -->
        <div class="ad-space-container" style="margin-top: 1rem; width: 100%">
          <div class="ad-banner-image slider-container">
            <span class="ad-label">Promoted</span>
            
            <div class="slider-wrapper">
              <a href="#install" class="ad-link" @click.prevent="triggerInstall">
                <div 
                  v-for="(img, idx) in promoImages" 
                  :key="idx" 
                  :class="['slide', { active: currentSlide === idx }]"
                >
                  <img :src="img" alt="Promote HVX Pro" class="ad-img" />
                </div>
              </a>
            </div>

            <!-- Navigation Arrows -->
            <button class="slider-arrow arrow-prev" @click="prevSlide" aria-label="Previous slide">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="slider-arrow arrow-next" @click="nextSlide" aria-label="Next slide">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <!-- Indicators -->
            <div class="slider-dots">
              <span 
                v-for="(img, idx) in promoImages" 
                :key="idx" 
                :class="['dot', { active: currentSlide === idx }]"
                @click="setSlide(idx)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Videos Sidebar -->
    <div class="related-videos">
      <h3 class="related-title">Up next</h3>
      <div class="related-list">
        <!-- Sponsored Video Card in Up Next -->
        <a
          href="#"
          class="related-card sponsored-related-card"
          style="text-decoration: none"
        >
          <div class="related-thumbnail">
            <img
              src="https://picsum.photos/seed/sponsor1/320/180"
              alt="Sponsored Thumbnail"
            />
            <span class="sponsored-badge-small">Sponsored</span>
            <span class="duration">0:30</span>
          </div>
          <div class="related-info">
            <h4 class="related-video-title">
              The Ultimate Setup for Developers - Shop Now
            </h4>
            <p class="related-channel">DevGear Official</p>
            <p class="related-meta">Ad &bull; Shop now</p>
          </div>
        </a>

        <!-- Normal Related Videos -->
        <template v-for="i in 8" :key="i">
          <NuxtLink
            :to="`/watch?v=${i}`"
            class="related-card"
            style="text-decoration: none"
          >
            <div class="related-thumbnail">
              <img
                :src="`https://picsum.photos/seed/${i + 20}/320/180`"
                alt="Thumbnail"
              />
              <span class="duration">12:{{ i + 30 }}</span>
            </div>
            <div class="related-info">
              <h4 class="related-video-title">
                Next JS vs Nuxt JS - Which one should you choose?
              </h4>
              <p class="related-channel">Huevangxp Channel</p>
              <p class="related-meta">
                {{ i * 22 }}K views &bull; {{ i + 2 }} days ago
              </p>
            </div>
          </NuxtLink>

          <!-- Injected Sidebar Image Ad after the 4th video -->
          <div
            v-if="i === 4"
            class="sidebar-ad-wrapper"
            style="margin: 0.5rem 0; width: 100%"
          >
            <PromotionalBanner layout="card" :campaign="3" />
          </div>
        </template>
      </div>
    </div>

    <!-- Popup Ad Overlay Promoting Our Website -->
    <div
      v-if="showPopupAd"
      class="popup-ad-overlay"
      @click.self="showPopupAd = false"
    >
      <div class="popup-ad-content">
        <button
          class="popup-close"
          @click="showPopupAd = false"
          aria-label="Close dialog"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <p class="popup-sponsored">Promoted</p>
        <h2 class="popup-title">Enjoy HVX Pro Anywhere!</h2>
        <img
          src="https://picsum.photos/seed/hvxprowatch/600/300"
          alt="HVX Pro App Mockup"
          class="popup-img"
        />
        <p class="popup-desc">
          Add HVX Pro to your home screen for instant access, offline playback
          support, and a modern app-like experience.
        </p>
        <button
          class="popup-btn"
          @click="triggerInstall"
          style="border: none; cursor: pointer"
        >
          Install HVX Pro
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.watch-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* Reset margins for edge-to-edge mobile player */
  margin: -2rem -1.5rem;
  padding-bottom: 2rem;
}

/* Video Player */
.video-player-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
}

/* Details Section */
.video-details {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.video-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
  color: var(--text-primary);
}

.video-primary-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.channel-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.channel-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.channel-text {
  flex: 1;
}

.channel-name {
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
}

.subscriber-count {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Advertisement Banner */
.ad-banner-image {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.ad-label {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0;
  z-index: 2;
  backdrop-filter: blur(4px);
}

.ad-link {
  display: block;
  width: 100%;
  height: auto;
  text-decoration: none;
}

.ad-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
  transition: opacity 0.2s;
}

.ad-link:hover .ad-img {
  opacity: 0.9;
}

/* Related Videos */
.related-videos {
  padding: 0 1rem;
}

.related-title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-card {
  display: flex;
  gap: 0.75rem;
}

.related-thumbnail {
  position: relative;
  width: 160px;
  flex-shrink: 0;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
}

.related-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-thumbnail .duration {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.related-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.related-video-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-channel,
.related-meta {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Desktop layout */
@media (min-width: 1024px) {
  .watch-page {
    flex-direction: row;
    margin: 0;
    padding: 1rem 0;
  }

  .main-content {
    flex: 1;
    min-width: 0;
  }

  .video-player-container {
    border-radius: 12px;
    overflow: hidden;
  }

  .video-details {
    padding: 1rem 0;
  }

  .video-primary-info {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .related-videos {
    width: 400px;
    padding: 0;
  }
}

/* Sponsored Related Card */
.sponsored-related-card {
  background-color: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  padding: 0.5rem;
}

.sponsored-badge-small {
  position: absolute;
  top: 4px;
  left: 4px;
  background: var(--accent-gradient);
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
}

/* Popup Ad Overlay */
.popup-ad-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.popup-ad-content {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.popup-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s;
}

.popup-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.popup-sponsored {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #a855f7;
  font-weight: 700;
}

.popup-title {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.popup-img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  max-height: 200px;
}

.popup-desc {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.popup-btn {
  background: var(--accent-gradient);
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: opacity 0.2s;
  margin-top: 0.5rem;
}

.popup-btn:hover {
  opacity: 0.9;
}

/* Image Slider styles */
.slider-container {
  position: relative;
  height: 120px;
  overflow: hidden;
}

@media (min-width: 640px) {
  .slider-container {
    height: 150px;
  }
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-wrapper .ad-link {
  display: block;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
}

.slide .ad-img {
  width: 100%;
  height: 100% !important;
  object-fit: cover;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(10, 15, 29, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: all 0.25s ease;
  backdrop-filter: blur(4px);
}

.slider-container:hover .slider-arrow {
  opacity: 1;
}

.arrow-prev {
  left: 0.75rem;
}

.arrow-next {
  right: 0.75rem;
}

.slider-arrow:hover {
  background: var(--accent-gradient);
  border-color: transparent;
  transform: translateY(-50%) scale(1.05);
}

.slider-dots {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.6);
}

.dot.active {
  background: #ffffff;
  transform: scale(1.2);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
}
</style>
