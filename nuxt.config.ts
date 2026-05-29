// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt"],

  vite: {
    server: {
      allowedHosts: true // Allow ngrok and other tunnel hosts
    }
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "HVX Pro",
      short_name: "HVXPro",
      description: "A professional website.",
      theme_color: "#ffffff",
      start_url: "/",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: "module",
    },
  },
});
