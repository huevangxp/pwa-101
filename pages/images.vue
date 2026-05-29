<template>
  <div class="images-page">
    <div class="header">
      <h1 class="page-title">Photo Gallery</h1>
      <p class="page-subtitle">Explore our collection of beautiful images</p>
    </div>

    <!-- Advertisement Space -->
    <div class="ad-space-container">
      <div class="ad-banner">
        <p class="ad-label">Sponsored</p>
        <h2>Discover More Online!</h2>
        <p>Visit our website to see exclusive content and offers.</p>
        <a href="#" class="ad-btn">Learn More</a>
      </div>
    </div>

    <div class="image-grid">
      <div v-for="i in 16" :key="i" class="image-card">
        <img :src="`https://picsum.photos/seed/${i + 50}/800/800`" alt="Gallery Image" loading="lazy" />
        <div class="image-overlay">
          <button class="icon-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.images-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}

.header {
  text-align: center;
  padding: 1rem 0;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.page-subtitle {
  color: var(--text-secondary);
  margin: 0.5rem 0 0 0;
}

/* Advertisement Space */
.ad-space-container {
  margin-bottom: 1rem;
}

.ad-banner {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
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

/* Image Grid */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
}

.image-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-card:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.icon-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

.icon-btn:hover {
  background: rgba(255,255,255,0.4);
}

@media (min-width: 640px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .images-page {
    padding: 2rem 0;
  }
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
