// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/base.ignore.css'],
  postcss: {
    plugins: {
      // tailwindcss: {},
      'postcss-pxtorem': {
        rootValue: 50,
        propList: ['*'],
        mediaQuery: false,
        exclude: 'ignore'
      }
    }
  },
  modules: ['@vant/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt']
})
