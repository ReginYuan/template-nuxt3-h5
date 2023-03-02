// https://nuxt.com/docs/api/configuration/nuxt-config
const envConfig = useRuntimeConfig().public

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
  // 代理转发
  nitro: {
    devProxy: {
      '/api': {
        target: envConfig.env.VITE_APP_BASE_API,
        changeOrigin: true
      }
    }
  },
  modules: ['@vant/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt']
})
