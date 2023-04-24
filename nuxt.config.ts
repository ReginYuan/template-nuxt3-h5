// https://nuxt.com/docs/api/configuration/nuxt-config
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
export default defineNuxtConfig({
  css: ["@/assets/main.css"],
  // css: ['@/assets/base.ignore.css'],
  // 把env放入这个里面，通过useRuntimeConfig获取
  vite: {
    envDir: '~/env', // 指定env文件夹
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? [
              'naive-ui',
              'vueuc',
              'date-fns-tz/esm/formatInTimeZone',
              '@babel/runtime/regenerator'
            ]
          : ['@babel/runtime/regenerator'],
      // 用于：从预捆绑中排除的依赖项
      exclude: []
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true
      },
      rollupOptions: {
        external: []
      }
    },
    plugins: [viteCommonjs(), esbuildCommonjs()],
    ssr: {
      noExternal: []
    }
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
            '@pzy915/pdf-preview',
            'pdfjs-dist'
          ]
        : ['@juggle/resize-observer', '@pzy915/pdf-preview', 'pdfjs-dist']
  },
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
  plugins: [],
  // 代理转发
  nitro: {
    preset: 'node-server',
    devProxy: {
      port: process.env.VITE_APP_PORT,
      host: true,
      open: true,
      '/api': {
        target: process.env.VITE_APP_BASE_URL,
        changeOrigin: true
      }
    }
  },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  experimental: {
    externalVue: true
  },
  imports: {
    dirs: ['composables', 'composables/**']
  }
})
