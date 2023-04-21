import { defineNuxtPlugin } from '#app'
import { Lazyload } from 'vant'

// 注册全局的lazy
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Lazyload)
})
