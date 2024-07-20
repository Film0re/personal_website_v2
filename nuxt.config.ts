export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', "@nuxt/image"],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('shadcn-')
    }
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  image: {
    format: ['webp'],
    domains: ['anilist.co', 's4.anilist.co']
  },

  compatibilityDate: '2024-07-16'
})
