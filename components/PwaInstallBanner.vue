<template>
  <div v-if="deferredPrompt" class="install-banner">
    <div class="banner-content">
      <p>Install our app for a better experience!</p>
      <div class="actions">
        <button @click="installApp" class="btn-install">Install App</button>
        <button @click="dismissPrompt" class="btn-dismiss">Not Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Hold the event to trigger it later
const deferredPrompt = ref(null);

const handleBeforeInstallPrompt = (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt.value = e;
};

const installApp = async () => {
  if (!deferredPrompt.value) return;

  // Show the native browser install prompt
  deferredPrompt.value.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.value.userChoice;

  console.log(`User response to the install prompt: ${outcome}`);

  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt.value = null;
};

const dismissPrompt = () => {
  // Hide the banner without triggering the prompt
  deferredPrompt.value = null;
};

onMounted(() => {
  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
});
</script>

<style scoped>
.install-banner {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  border: 1px solid #e5e7eb;
}

.banner-content p {
  margin: 0 0 12px 0;
  font-weight: 500;
  color: #374151;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-install {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-dismiss {
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
