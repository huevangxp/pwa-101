<template>
  <div class="video-feed">
    <!-- Categories Filter (Like YouTube's top pills) -->
    <div class="categories-container">
      <div class="categories-scroll">
        <button class="category-pill active">All</button>
        <button class="category-pill">Music</button>
        <button class="category-pill">Gaming</button>
        <button class="category-pill">Live</button>
        <button class="category-pill">Coding</button>
        <button class="category-pill">Podcasts</button>
        <button class="category-pill">News</button>
        <button class="category-pill">Mixes</button>
      </div>
    </div>

    <!-- Video Grid -->
    <div class="video-grid">
      <div v-for="i in 12" :key="i" class="video-card">
        <div class="thumbnail-container">
          <img :src="`https://picsum.photos/seed/${i + 10}/640/360`" alt="Video thumbnail" class="thumbnail" />
          <span class="duration">10:{{ i + 15 }}</span>
        </div>
        <div class="video-info">
          <img :src="`https://ui-avatars.com/api/?name=Ch+${i}&background=random&color=fff&size=48`" alt="Channel avatar" class="avatar" />
          <div class="video-text">
            <h3 class="video-title">Building an amazing Nuxt 3 PWA App like YouTube from scratch - Part {{ i }}</h3>
            <p class="channel-name">Huevangxp Channel</p>
            <p class="video-meta">{{ i * 14 }}K views &bull; {{ i }} days ago</p>
          </div>
          <button class="more-options">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-feed {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* Resetting margin to full width on mobile since layout handles padding */
  margin: -1rem; 
  padding-bottom: 2rem;
}

/* Category Pills */
.categories-container {
  position: sticky;
  top: 60px; /* Below the header */
  background-color: var(--bg-primary);
  z-index: 90;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 0.5rem;
}

.categories-scroll {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.categories-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.category-pill {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.category-pill:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.category-pill.active {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}

/* Video Grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem 1rem;
  padding: 0 1rem;
}

/* Video Card */
.video-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
}

.thumbnail-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background-color: #202020;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.video-card:hover .thumbnail {
  transform: scale(1.02); /* Slight zoom effect like YT */
}

.duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Video Info */
.video-info {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  position: relative;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.video-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0; /* Important for text truncation */
}

.video-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  color: var(--text-primary);
  /* Truncate to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.channel-name, .video-meta {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.channel-name:hover {
  color: var(--text-primary);
}

.more-options {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.video-card:hover .more-options {
  opacity: 1;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0; /* Edge to edge on mobile like YT */
  }

  .thumbnail-container {
    border-radius: 0; /* Square edges on mobile full width */
  }

  .video-info {
    padding: 0 1rem; /* Padding for text since thumbnail is edge-to-edge */
  }

  .more-options {
    opacity: 1; /* Always show dots on mobile */
  }
}
</style>
