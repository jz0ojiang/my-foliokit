// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  ssr: false,
  css: [
    "~/assets/styles/main.css",
    "~/assets/styles/tag.css",
    "~/assets/styles/markdown.css"
  ],
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    minify: true
  },
  app: {
    head: {
      link: [
        { 
          rel: "preload",
          href: "/fonts/LXGWWenKaiLite-Regular-subset.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/LXGWWenKaiLite-Medium-subset.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/Poppins-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/Poppins-Bold.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    './modules/generate-font-glyphs',
    'nuxt-twemoji',
    '@pinia/nuxt'
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    lazy: true,
    locales: [
      { code: 'zh', iso: 'zh-CN', name: '简体中文' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  generateFontGlyphs: {
    debug: true
  }
})