import { defineNuxtPlugin } from '#app'
import vuePdf from 'vue-pdf'
/**
 *自定义插件 添加版心
 * */
export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    nuxtApp.vueApp.use(vuePdf)
  }
})
