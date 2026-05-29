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
            <button class="btn-subscribe">Subscribe</button>
          </div>

          <div class="video-actions">
            <div class="action-group">
              <button class="action-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                12K
              </button>
              <div class="divider"></div>
              <button class="action-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
              </button>
            </div>
            <button class="action-btn rounded">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              Share
            </button>
          </div>
        </div>

        <div class="video-description">
          <p class="views-date">124,532 views &bull; Premiered Oct 24, 2025</p>
          <p>Learn how to build a fully functional Progressive Web App using Nuxt 3. In this tutorial we cover everything from service workers to web manifests and UI cloning!</p>
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

.btn-subscribe {
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
}

.video-actions {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.video-actions::-webkit-scrollbar { display: none; }

.action-group {
  display: flex;
  background: rgba(255,255,255,0.1);
  border-radius: 50px;
  overflow: hidden;
}

.action-btn {
  background: rgba(255,255,255,0.1);
  border: none;
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}
.action-group .action-btn { background: transparent; }
.action-btn.rounded { border-radius: 50px; }

.divider {
  width: 1px;
  background: rgba(255,255,255,0.2);
  margin: 0.5rem 0;
}

.video-description {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  line-height: 1.5;
}

.views-date {
  font-weight: 600;
  margin: 0 0 0.25rem 0;
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
