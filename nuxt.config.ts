export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image',
    '@sidebase/nuxt-auth',
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/harlem',
    '@nuxt/ui',
    '@nuxthub/core',
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: ['defineStore'],
    import: {
      dirs: ['./stores']
    }
  },
  tailwindcss: {
    exposeConfig: true,
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
        './node_modules/@nuxt/ui/dist/**/*.{js,vue,ts}'
      ],
    }
  },
  runtimeConfig: {
    authOrigin: process.env.AUTH_ORIGIN,
    authSecret: process.env.NUXT_AUTH_SECERET,
    googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    geminiApiKey: process.env.GEMINI_API_KEY,
    DB: {}
  },
  auth: {
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'google',
      addDefaultCallbackUrl: true
    },
    globalAppMiddleware: true,
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  ui: {
    global: true,
  },
  hub: {
    database: true,
  },
  nitro: {
    experimental: {
      wasm: true
    },
  },
  
})