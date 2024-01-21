// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: false,

  app: {
    head: {
      title: 'Prismic + Nuxt Minimal Starter',
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
    }
  },

  modules: ['@nuxtjs/prismic',
    "@nuxtjs/robots",
    "nuxt-simple-sitemap",
    "@nuxtjs/google-fonts",
    "nuxt-jsonld",
    "nuxt-og-image",
    "@nuxtjs/tailwindcss"],
  googleFonts: {
    families: {
      Montserrat: [300],
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
  },
})