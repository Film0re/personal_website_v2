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
  }

})