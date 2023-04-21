import { defineNuxtPlugin } from '#app'
import kysenFlexible from 'kysen-flexible'
/**
 *自定义插件 添加版心
 * */
export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    nuxtApp.vueApp.use(kysenFlexible)
  }
})
