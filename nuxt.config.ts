// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt"],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "My Awesome Nuxt PWA",
      short_name: "Nuxt PWA",
      description: "A simple Nuxt 3 PWA example.",
      theme_color: "#ffffff",
      start_url: "/", // ✨ CHANGED: Must be a valid route
      icons: [
        {
          src: "/pwa-192x192.png", // ✨ CHANGED: Added leading slash
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png", // ✨ CHANGED: Added leading slash
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    // client: {
    //   installPrompt: true,
    // },
  },
});
