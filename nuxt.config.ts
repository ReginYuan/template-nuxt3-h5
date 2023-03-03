// https://nuxt.com/docs/api/configuration/nuxt-config
console.log('当前环境：', process.env.VITE_APP_BASE_URL)
export default defineNuxtConfig({
  // 把env放入这个里面，通过useRuntimeConfig获取
  vite: {
    envDir: '~/env' // 指定env文件夹
  },
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
    port: process.env.VITE_APP_PORT,
    host: true,
    open: true,
    devProxy: {
      '/dev-api': {
        target: process.env.VITE_APP_BASE_URL,
        changeOrigin: true,
        rewrite: p => {
          return p.replace(/^\/dev-api/, '')
        }
      }
    }
  },
  modules: ['@vant/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt']
})
