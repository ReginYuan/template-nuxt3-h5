import { defineNuxtPlugin } from '#app'

import {
  PdfjsDistConfigType,
  pdfPreviewBuilder,
  PdfPreviewConfig,
} from '@pzy915/pdf-preview'

export const baseUrl = '/pdf-preview-wk/'
const pdfjsDistRes = 'pdfjs-dist-res'
const workerSrc = `${baseUrl}${pdfjsDistRes}/build/pdf.worker.min.js`
const cMapUrl = `${baseUrl}${pdfjsDistRes}/cmaps`

const pdfjsDistConfig: PdfjsDistConfigType = {
  workerSrc,
  cMapUrl,
}

const pdfPreview = pdfPreviewBuilder(pdfjsDistConfig)

/**
 *自定义插件 添加pdf解析插件
 * */
export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    nuxtApp.vueApp.use(pdfPreview as any)
  }
})
