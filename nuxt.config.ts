export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/image", "@nuxtjs/apollo"],
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'embla-carousel-vue',
        'lucide-vue-next',
        'reka-ui',
        'tailwind-merge',
      ]
    }
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://spacex-production.up.railway.app",
      },
    },
  },

  runtimeConfig: {
    steamApiKey: process.env.STEAM_API_KEY,
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("shadcn-"),
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  components: [
    {
      path: "./components",
      extensions: ["vue"],
    },
  ],

  image: {
    format: ["webp"],
    domains: ["anilist.co", "s4.anilist.co"],
  },

  compatibilityDate: "2024-07-16",

  devtools: {
    timeline: {
      enabled: true,
    },
  },
});
