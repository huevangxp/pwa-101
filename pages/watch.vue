<template>
  <div class="watch-page">
    <div class="main-content">
      <!-- Video Player -->
      <div class="video-player-container">
        <iframe 
          src="https://player.mediadelivery.net/embed/256380/d9d9ab1f-fc9f-4488-9c26-4ffc653c0024?autoplay=true&loop=false&muted=false" 
          loading="lazy" 
          style="border:0; position:absolute; top:0; left:0; height:100%; width:100%;" 
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
          allowfullscreen="true">
        </iframe>
      </div>

      <!-- Video Details -->
      <div class="video-details">
        <h1 class="video-title">Building an amazing Nuxt 3 PWA App like YouTube from scratch - Part {{ $route.query.v || 1 }}</h1>
        
        <div class="video-primary-info">
          <div class="channel-info">
            <img :src="`https://ui-avatars.com/api/?name=Ch+${$route.query.v || 1}&background=random&color=fff&size=48`" alt="Channel" class="channel-avatar" />
            <div class="channel-text">
              <h3 class="channel-name">Huevangxp Channel</h3>
              <p class="subscriber-count">1.2M subscribers</p>
            </div>
          </div>
        </div>

        <!-- Advertisement Space -->
        <div class="ad-banner">
          <p class="ad-label">Sponsored</p>
          <h2>Visit Our Website Today!</h2>
          <p>Discover amazing products and services tailormade for you.</p>
          <a href="#" class="ad-btn">Learn More</a>
        </div>
      </div>
    </div>

    <!-- Related Videos Sidebar -->
    <div class="related-videos">
      <h3 class="related-title">Up next</h3>
      <div class="related-list">
        <NuxtLink :to="`/watch?v=${i}`" v-for="i in 8" :key="i" class="related-card" style="text-decoration: none;">
          <div class="related-thumbnail">
            <img :src="`https://picsum.photos/seed/${i + 20}/320/180`" alt="Thumbnail" />
            <span class="duration">12:{{ i + 30 }}</span>
          </div>
          <div class="related-info">
            <h4 class="related-video-title">Next JS vs Nuxt JS - Which one should you choose?</h4>
            <p class="related-channel">Huevangxp Channel</p>
            <p class="related-meta">{{ i * 22 }}K views &bull; {{ i + 2 }} days ago</p>
          </div>
        </NuxtLink>
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
.ad-banner {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  margin-top: 0.5rem;
}

.ad-label {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0;
}

.ad-banner h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.ad-banner p {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.ad-btn {
  align-self: flex-start;
  background: var(--accent-gradient);
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: opacity 0.2s;
}

.ad-btn:hover {
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
  background: rgba(0,0,0,0.8);
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

.related-channel, .related-meta {
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
</style>
