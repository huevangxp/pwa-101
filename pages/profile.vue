<script setup>
import { ref, onMounted, computed } from 'vue'

const pwaEvent = useState('pwaEvent')

// Profile State
const profile = ref({
  name: 'Huevangxp',
  email: 'huevangxp@gmail.com',
  bio: 'Creative Frontend Developer & PWA enthusiast building high-performance modern web apps.',
  subscribers: '1.2M',
  videos: '342',
  joined: 'June 2024',
  avatar: 'https://i.pravatar.cc/150?img=68'
})

const isEditing = ref(false)
const editedProfile = ref({ ...profile.value })

// Notification Preferences
const notifyPrefs = ref({
  newVideos: true,
  creatorUpdates: true,
  channelAnalytics: false,
  comments: true
})

// Toast Messages State
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

let toastTimeout = null
const showToast = (msg, type = 'success') => {
  if (toastTimeout) clearTimeout(toastTimeout)
  toast.value = { show: true, message: msg, type }
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

// Notification API State
const permissionStatus = ref('default') // 'default', 'granted', 'denied', 'unsupported'
const isServiceWorkerActive = ref(false)

const getPermissionClass = computed(() => {
  switch (permissionStatus.value) {
    case 'granted': return 'badge-success'
    case 'denied': return 'badge-danger'
    case 'default': return 'badge-warning'
    default: return 'badge-secondary'
  }
})

const checkNotificationSupport = () => {
  if (!process.client) return
  if (!('Notification' in window)) {
    permissionStatus.value = 'unsupported'
    return
  }
  permissionStatus.value = Notification.permission
}

const checkServiceWorker = async () => {
  if (process.client && 'serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.getRegistration()
      isServiceWorkerActive.value = !!reg
    } catch (e) {
      isServiceWorkerActive.value = false
    }
  }
}

// Notification Inbox Mock Log
const notificationInbox = ref([
  { id: 1, title: '⚡ PWA Integration Active', body: 'Your PWA is configured and caching offline resources.', time: '2 mins ago', icon: '⚡' },
  { id: 2, title: '🎉 Welcome to your Profile', body: 'Customise your notifications and user details here.', time: '10 mins ago', icon: '👤' }
])

// Request Permission
const requestPermission = async () => {
  if (!process.client) return
  if (!('Notification' in window)) {
    showToast("Notifications not supported on this browser.", "error")
    return
  }
  
  try {
    const permission = await Notification.requestPermission()
    permissionStatus.value = permission
    if (permission === 'granted') {
      showToast("Notification permission granted! Welcome aboard.", "success")
      sendPwaNotification("Start Pro Subscription Activated", "You have successfully subscribed to channel updates from Huevangxp.")
    } else if (permission === 'denied') {
      showToast("Permission denied. You can re-enable this in browser settings.", "error")
    }
  } catch (err) {
    console.error("Error requesting permission:", err)
  }
}

// Send Native PWA Notification
const sendPwaNotification = async (title, body) => {
  if (!process.client) return
  if (permissionStatus.value !== 'granted') {
    await requestPermission()
    if (permissionStatus.value !== 'granted') return
  }

  const options = {
    body: body,
    icon: '/pwa-192x192.png',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    tag: 'hvx-pwa-general',
    renotify: true,
    data: {
      url: window.location.origin + '/profile'
    }
  }

  // Push to local log
  notificationInbox.value.unshift({
    id: Date.now(),
    title,
    body,
    time: 'Just now',
    icon: '🔔'
  })

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready
      if (reg) {
        await reg.showNotification(title, options)
        return
      }
    }
    // Fallback if ServiceWorker isn't running/supported
    const n = new Notification(title, options)
    n.onclick = () => {
      window.focus()
    }
  } catch (error) {
    console.warn("SW notification failed, falling back to standard notification:", error)
    const n = new Notification(title, options)
    n.onclick = () => {
      window.focus()
    }
  }
}

// Background Scheduling
const scheduleSeconds = ref(5)
const isScheduling = ref(false)

const scheduleNotification = () => {
  if (isScheduling.value) return
  isScheduling.value = true
  showToast(`Notification scheduled in ${scheduleSeconds.value}s. Try minimizing the app!`, "success")
  
  setTimeout(() => {
    sendPwaNotification(
      "Huevangxp Live Stream Starting",
      `Join Huevangxp live right now for the weekly Nuxt 3 developer stream.`
    )
    isScheduling.value = false
  }, scheduleSeconds.value * 1000)
}

// Trigger App Install
const triggerInstall = async () => {
  if (pwaEvent.value) {
    pwaEvent.value.prompt()
    const { outcome } = await pwaEvent.value.userChoice
    if (outcome === 'accepted') {
      pwaEvent.value = null
      showToast("Thank you for installing HVX Pro!", "success")
    }
  } else {
    showToast("PWA is already installed or your browser does not support automatic prompts.", "info")
  }
}

const saveProfile = () => {
  profile.value = { ...editedProfile.value }
  isEditing.value = false
  showToast("Profile settings saved successfully!", "success")
}

const cancelEditing = () => {
  editedProfile.value = { ...profile.value }
  isEditing.value = false
}

// Load configurations
onMounted(() => {
  checkNotificationSupport()
  checkServiceWorker()
  
  // Persist preference values if already present
  if (localStorage.getItem('hvx_notify_prefs')) {
    try {
      notifyPrefs.value = JSON.parse(localStorage.getItem('hvx_notify_prefs'))
    } catch(e) {}
  }
})

const togglePref = (key) => {
  notifyPrefs.value[key] = !notifyPrefs.value[key]
  localStorage.setItem('hvx_notify_prefs', JSON.stringify(notifyPrefs.value))
  showToast("Preferences updated!", "success")
}
</script>

<template>
  <div class="profile-page">
    <!-- Glowing Blur Decorative Backgrounds -->
    <div class="glow-bg-1"></div>
    <div class="glow-bg-2"></div>

    <!-- Toast Component -->
    <Transition name="toast-fade">
      <div v-if="toast.show" :class="['toast-alert', `toast-${toast.type}`]">
        <div class="toast-icon">
          <span v-if="toast.type === 'success'">✔</span>
          <span v-else-if="toast.type === 'error'">✖</span>
          <span v-else>ℹ</span>
        </div>
        <div class="toast-body">{{ toast.message }}</div>
      </div>
    </Transition>

    <!-- Banner Cover Picture -->
    <div class="profile-banner">
      <div class="banner-overlay"></div>
    </div>

    <!-- Main Grid Dashboard -->
    <div class="profile-grid">
      
      <!-- Left Column: User details -->
      <div class="grid-col-left">
        <!-- Avatar card -->
        <div class="glass-card profile-details-card">
          <div class="profile-header">
            <div class="avatar-wrapper">
              <img :src="profile.avatar" alt="Avatar" class="avatar-img" />
              <div class="status-indicator"></div>
            </div>
            <h2 class="user-display-name">{{ profile.name }}</h2>
            <p class="user-email">{{ profile.email }}</p>
            <p class="user-bio">"{{ profile.bio }}"</p>
          </div>

          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">{{ profile.subscribers }}</span>
              <span class="stat-label">Subscribers</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ profile.videos }}</span>
              <span class="stat-label">Videos</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ profile.joined }}</span>
              <span class="stat-label">Joined</span>
            </div>
          </div>

          <div class="card-footer-actions">
            <button 
              v-if="!isEditing" 
              class="btn-outline-primary full-width" 
              @click="isEditing = true"
            >
              Edit Profile details
            </button>
          </div>
        </div>

        <!-- Inline Profile Editing -->
        <Transition name="slide-down">
          <div v-if="isEditing" class="glass-card edit-profile-card">
            <h3 class="card-title">Edit Profile Information</h3>
            <div class="form-group">
              <label class="form-label">Display Name</label>
              <input type="text" v-model="editedProfile.name" class="form-input" placeholder="Name" />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" v-model="editedProfile.email" class="form-input" placeholder="Email" />
            </div>
            <div class="form-group">
              <label class="form-label">Bio Description</label>
              <textarea v-model="editedProfile.bio" class="form-textarea" placeholder="Describe yourself..."></textarea>
            </div>
            <div class="form-actions">
              <button class="btn btn-secondary" @click="cancelEditing">Cancel</button>
              <button class="btn btn-primary" @click="saveProfile">Save Changes</button>
            </div>
          </div>
        </Transition>

        <!-- System & SW Status -->
        <div class="glass-card system-status-card">
          <h3 class="card-title">PWA & System Metrics</h3>
          <div class="status-row">
            <span>Service Worker:</span>
            <span :class="['status-value-badge', isServiceWorkerActive ? 'val-active' : 'val-inactive']">
              {{ isServiceWorkerActive ? 'ACTIVE' : 'INACTIVE' }}
            </span>
          </div>
          <div class="status-row">
            <span>Notification Support:</span>
            <span :class="['status-value-badge', permissionStatus !== 'unsupported' ? 'val-active' : 'val-inactive']">
              {{ permissionStatus !== 'unsupported' ? 'SUPPORTED' : 'NOT SUPPORTED' }}
            </span>
          </div>
          <div class="status-row">
            <span>PWA Installs Prompt:</span>
            <span :class="['status-value-badge', pwaEvent ? 'val-active' : 'val-neutral']">
              {{ pwaEvent ? 'AVAILABLE' : 'INSTALLED / BLOCKED' }}
            </span>
          </div>
          <button 
            v-if="pwaEvent" 
            class="btn btn-install-glow full-width" 
            @click="triggerInstall"
          >
            ⚡ Install HVX Pro on Desktop/Mobile
          </button>
        </div>
      </div>

      <!-- Right Column: Notifications center -->
      <div class="grid-col-right">
        
        <!-- Notification Permissions Card -->
        <div class="glass-card notification-panel-card">
          <div class="card-header-icon">
            <div class="bell-glow-icon">🔔</div>
            <div>
              <h3 class="card-title">PWA Notification Center</h3>
              <p class="card-subtitle">Manage device pushes and alerts</p>
            </div>
          </div>

          <div class="permission-status-box">
            <div class="permission-meta">
              <span class="meta-title">Status:</span>
              <span :class="['badge-status', getPermissionClass]">
                {{ permissionStatus.toUpperCase() }}
              </span>
            </div>
            <p v-if="permissionStatus === 'default'" class="permission-description">
              Receive notifications for channel updates, live streams, and responses. Click below to allow permissions.
            </p>
            <p v-else-if="permissionStatus === 'granted'" class="permission-description text-success">
              You are ready! Notifications are successfully configured on this PWA.
            </p>
            <p v-else class="permission-description text-danger">
              Notifications are blocked. Please reset site permissions in your browser's address bar to enable notifications.
            </p>
            
            <button 
              v-if="permissionStatus !== 'granted'" 
              class="btn btn-primary" 
              @click="requestPermission"
            >
              Request Permission
            </button>
          </div>

          <!-- Quick Actions -->
          <div class="quick-notif-actions">
            <h4 class="section-title">Developer Utilities</h4>
            <div class="button-row">
              <button 
                class="btn btn-primary btn-glow-purple" 
                :disabled="permissionStatus !== 'granted'"
                @click="sendPwaNotification('Huevangxp Uploaded a Video', 'Nuxt 3 PWA Masterclass: Building offline apps with Workbox. Watch now!')"
              >
                Simulate Video Upload
              </button>
              
              <div class="scheduler-box">
                <button 
                  class="btn btn-secondary btn-schedule" 
                  :disabled="permissionStatus !== 'granted' || isScheduling"
                  @click="scheduleNotification"
                >
                  {{ isScheduling ? 'Scheduling...' : `Schedule (${scheduleSeconds}s)` }}
                </button>
                <div class="schedule-input-wrapper">
                  <input 
                    type="number" 
                    v-model="scheduleSeconds" 
                    min="1" 
                    max="60" 
                    class="schedule-sec-input"
                  />
                  <span class="sec-label">sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subscriptions Toggles -->
        <div class="glass-card preference-settings-card">
          <h3 class="card-title">Subscription Preferences</h3>
          <p class="card-subtitle">Choose the types of updates you receive</p>
          
          <div class="preference-list">
            
            <!-- Toggle 1 -->
            <div class="preference-item" @click="togglePref('newVideos')">
              <div class="pref-text">
                <span class="pref-name">New Upload Alerts</span>
                <span class="pref-desc">Get notified as soon as new videos are published.</span>
              </div>
              <div :class="['custom-toggle', { active: notifyPrefs.newVideos }]">
                <span class="toggle-slider"></span>
              </div>
            </div>

            <!-- Toggle 2 -->
            <div class="preference-item" @click="togglePref('creatorUpdates')">
              <div class="pref-text">
                <span class="pref-name">Creator Updates & Stories</span>
                <span class="pref-desc">Be notified when creators post text posts or updates.</span>
              </div>
              <div :class="['custom-toggle', { active: notifyPrefs.creatorUpdates }]">
                <span class="toggle-slider"></span>
              </div>
            </div>

            <!-- Toggle 3 -->
            <div class="preference-item" @click="togglePref('comments')">
              <div class="pref-text">
                <span class="pref-name">Comments & Mentions</span>
                <span class="pref-desc">Alerts when someone replies to your channel comments.</span>
              </div>
              <div :class="['custom-toggle', { active: notifyPrefs.comments }]">
                <span class="toggle-slider"></span>
              </div>
            </div>

            <!-- Toggle 4 -->
            <div class="preference-item" @click="togglePref('channelAnalytics')">
              <div class="pref-text">
                <span class="pref-name">Creator Studio Insights</span>
                <span class="pref-desc">Weekly updates on subscriber spikes and watchtimes.</span>
              </div>
              <div :class="['custom-toggle', { active: notifyPrefs.channelAnalytics }]">
                <span class="toggle-slider"></span>
              </div>
            </div>

          </div>
        </div>

        <!-- In-app notification simulation logs -->
        <div class="glass-card notification-inbox-card">
          <div class="inbox-header">
            <h3 class="card-title">Live Notification Logs</h3>
            <span class="inbox-count">{{ notificationInbox.length }} logs</span>
          </div>
          
          <div v-if="notificationInbox.length > 0" class="inbox-list">
            <div v-for="item in notificationInbox" :key="item.id" class="inbox-item">
              <div class="inbox-item-icon">{{ item.icon }}</div>
              <div class="inbox-item-content">
                <div class="inbox-item-header">
                  <span class="inbox-item-title">{{ item.title }}</span>
                  <span class="inbox-item-time">{{ item.time }}</span>
                </div>
                <p class="inbox-item-body">{{ item.body }}</p>
              </div>
            </div>
          </div>
          <div v-else class="inbox-empty">
            <p>No notifications triggered yet. Click "Trigger Instant Alert" to see logs populate here.</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.profile-page {
  position: relative;
  min-height: 100vh;
  margin-top: -2rem;
  padding-bottom: 5rem;
}

/* Glowing Backdrops */
.glow-bg-1 {
  position: absolute;
  top: 15%;
  left: 5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
}

.glow-bg-2 {
  position: absolute;
  top: 50%;
  right: 5%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
  filter: blur(100px);
  z-index: 0;
  pointer-events: none;
}

/* Banner */
.profile-banner {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, #1e1b4b 0%, #311042 50%, #0a0f1d 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0 0 16px 16px;
  overflow: hidden;
  z-index: 1;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15), transparent 60%);
}

/* Profile Grid */
.profile-grid {
  position: relative;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: -60px auto 0 auto;
  padding: 0 1rem;
  z-index: 2;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
    margin-top: -40px;
  }
}

/* Cards Design System */
.glass-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.card-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.card-subtitle {
  margin: 4px 0 0 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Profile Details Card */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 1.5rem;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.avatar-img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid #6366f1;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
  background-color: var(--bg-primary);
}

.status-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  background-color: #10b981;
  border: 2px solid #0f172a;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
}

.user-display-name {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.user-email {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 4px 0 8px 0;
}

.user-bio {
  font-size: 0.875rem;
  color: #cbd5e1;
  margin: 0;
  line-height: 1.5;
  font-style: italic;
}

/* Profile Stats */
.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-top: 4px;
  letter-spacing: 0.05em;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: var(--accent-gradient);
  color: white;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.25);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  opacity: 0.95;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
}

.btn-outline-primary {
  background: transparent;
  border: 1px solid rgba(99, 102, 241, 0.4);
  color: #a5b4fc;
  padding: 0.7rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline-primary:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: #6366f1;
  color: white;
}

.btn-glow-purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
}

.btn-glow-purple:hover:not(:disabled) {
  box-shadow: 0 6px 22px rgba(139, 92, 246, 0.35);
}

.btn-install-glow {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  color: white;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(6, 182, 212, 0.25);
}

.btn-install-glow:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(6, 182, 212, 0.45);
}

.full-width {
  width: 100%;
}

.card-footer-actions {
  margin-top: 1.25rem;
}

/* Edit profile form */
.edit-profile-card {
  border-color: rgba(99, 102, 241, 0.25);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.form-group {
  margin-top: 1rem;
}

.form-label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input, .form-textarea {
  width: 100%;
  box-sizing: border-box;
  background: rgba(10, 15, 29, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: all 0.2s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
}

.form-textarea {
  height: 80px;
  resize: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

/* System metrics */
.system-status-card {
  margin-top: 0.5rem;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 0.875rem;
}

.status-row:last-of-type {
  border-bottom: none;
}

.status-value-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.val-active {
  background-color: rgba(16, 185, 129, 0.12);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.val-inactive {
  background-color: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.val-neutral {
  background-color: rgba(245, 158, 11, 0.12);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

/* PWA Notification Panel Card */
.card-header-icon {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
}

.bell-glow-icon {
  font-size: 2.25rem;
  animation: pulseBell 2s infinite ease-in-out;
}

@keyframes pulseBell {
  0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(99, 102, 241, 0.2)); }
  50% { transform: scale(1.08) rotate(10deg); filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.6)); }
  100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(99, 102, 241, 0.2)); }
}

.permission-status-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.permission-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.meta-title {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.badge-status {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  letter-spacing: 0.03em;
}

.badge-success { background-color: #065f46; color: #a7f3d0; border: 1px solid #047857; }
.badge-warning { background-color: #78350f; color: #fde68a; border: 1px solid #b45309; }
.badge-danger { background-color: #7f1d1d; color: #fecaca; border: 1px solid #b91c1c; }
.badge-secondary { background-color: #374151; color: #d1d5db; border: 1px solid #4b5563; }

.permission-description {
  margin: 0 0 1.25rem 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.permission-description.text-success { color: #34d399; }
.permission-description.text-danger { color: #f87171; }

.section-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quick-notif-actions {
  padding-top: 0.5rem;
}

.button-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.scheduler-box {
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  flex: 1;
  min-width: 200px;
}

.btn-schedule {
  background: transparent;
  border: none;
  flex: 1;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0;
  height: 100%;
}

.btn-schedule:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05);
}

.schedule-input-wrapper {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  gap: 4px;
}

.schedule-sec-input {
  width: 40px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
}

.schedule-sec-input:focus {
  outline: none;
}

.sec-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Preference Toggles */
.preference-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.25rem;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.preference-item:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.06);
}

.pref-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 1rem;
}

.pref-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.pref-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Custom Toggle Switch CSS */
.custom-toggle {
  position: relative;
  width: 44px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  transition: background-color 0.3s;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.custom-toggle.active {
  background: var(--accent-gradient);
  border-color: transparent;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-toggle.active .toggle-slider {
  transform: translateX(20px);
}

/* Inbox logs */
.inbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.inbox-count {
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.07);
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--text-secondary);
}

.inbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
}

.inbox-list::-webkit-scrollbar {
  width: 5px;
}

.inbox-list::-webkit-scrollbar-track {
  background: transparent;
}

.inbox-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.inbox-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.85rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  animation: slideIn 0.3s ease;
}

.inbox-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.inbox-item-content {
  flex: 1;
  min-width: 0;
}

.inbox-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2px;
}

.inbox-item-title {
  font-size: 0.875rem;
  font-weight: 650;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.inbox-item-time {
  font-size: 0.7rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.inbox-item-body {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.inbox-empty {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

/* Toast Styles */
.toast-alert {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  max-width: 320px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.toast-success {
  background: rgba(16, 185, 129, 0.85);
  border-color: rgba(52, 211, 153, 0.3);
}

.toast-error {
  background: rgba(239, 68, 68, 0.85);
  border-color: rgba(248, 113, 113, 0.3);
}

.toast-info {
  background: rgba(6, 182, 212, 0.85);
  border-color: rgba(34, 211, 238, 0.3);
}

.toast-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.toast-body {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.4;
}

/* Transitions */
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 400px;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
