import {
  createDiscreteApi
} from "naive-ui";

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref()
  nuxtApp.hook('app:mounted', (e) => {
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(["loadingBar"])
      bar.value = loadingBar
    }
  })
  nuxtApp.hook('page:start', (e) => {
    bar.value?.start()
  })
  nuxtApp.hook('page:finish', (e) => {
    setTimeout(() => {
      bar.value?.finish()
    }, 150);
  })
  nuxtApp.hook('app:error', (e) => {
    // 如果在客户端就加载
    if (process.client) {
      setTimeout(() => {
        bar.value?.finish()
      }, 150);
    }
  })
})