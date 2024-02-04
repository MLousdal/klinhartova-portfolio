// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,
  site: {
    url: 'https://klinhartova-portfolio.vercel.app/',
  },
  app: {
    head: {
      title: 'Kristina Linhartová - Portfolio',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/prismic',
    "@nuxtjs/google-fonts",
    '@nuxtjs/sitemap',
    "@nuxtjs/tailwindcss"],
  googleFonts: {
    families: {
      Montserrat: [300, 600],
      MuseoModerno: [700]
    }
  },
  tailwindcss: {
    viewer: false
  },
  prismic: {
    endpoint: 'klinhartova-portfolio',
    preview: '/api/preview',
    clientConfig: {
      routes: [
        {
          type: 'article',
          path: '/:uid',
        },
        {
          type: 'page',
          uid: 'home',
          path: '/',
        },
      ]
    }
  }
})