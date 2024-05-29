// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module"],
  buildModules: [
    '@nuxtjs/dotenv'
],
})

// defineNuxtConfig