// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Bialystok information service',
    },
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',

  eslint: {
    config: {
      stylistic: true,
    },
  },

  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    jwtSecret: ''
  },

  ssr: false,
})
