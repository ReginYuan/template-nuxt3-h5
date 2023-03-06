// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // 把env放入这个里面，通过useRuntimeConfig获取
  vite: {
    envDir: '~/env', // 指定env文件夹
    optimizeDeps: {
      // 用于：从预捆绑中排除的依赖项
      exclude: []
    }
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
    devProxy: {
      port: process.env.VITE_APP_PORT,
      host: true,
      open: true,
      '/dev-api': {
        target: process.env.VITE_APP_BASE_URL,
        changeOrigin: true
      }
    }
  },
  modules: [
    '@vant/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@unocss/nuxt'
  ]
})
