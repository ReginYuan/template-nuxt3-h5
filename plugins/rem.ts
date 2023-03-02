import { defineNuxtPlugin } from '#app'

/**
 *自定义插件 全局转换rem
 * 设置rem 1rem = 100px
 * */
export default defineNuxtPlugin(() => {
  if (process.client) {
    // 屏幕适应
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(function (win, doc) {
      if (!win.addEventListener) return
      function setFont() {
        // var html = document.documentElement;
        // var k = 640;
        // html.style.fontSize = html.clientWidth / k * 100 + "px";
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        let screenWidth = document.querySelector('html')!.offsetWidth
        const baseSz = 100
        const pageWidth = 750
        if (screenWidth > 640) screenWidth = 640

        let fZ = (baseSz * screenWidth) / pageWidth
        if (fZ > 85) fZ = 85
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('html')!.style.fontSize = `${fZ}px`
      }
      setFont()
      setTimeout(() => {
        setFont()
      }, 300)
      doc.addEventListener('DOMContentLoaded', setFont, false)
      win.addEventListener('resize', setFont, false)
      win.addEventListener('load', setFont, false)
    })(window, document)
  }
})
