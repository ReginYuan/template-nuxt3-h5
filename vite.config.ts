import { defineConfig } from 'vite'
// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  optimizeDeps: {
    include: []
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  plugins: [
    // vue(),
    // Components({
    //   resolvers: [],
    // }),
  ]
})
