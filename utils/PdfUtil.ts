import {
  PdfjsDistConfigType,
  pdfPreviewBuilder,
  PdfPreviewConfig
} from '@pzy915/pdf-preview'


export const baseUrl = '/pdfjs-dist-res'
const workerSrc = `${baseUrl}/build/pdf.worker.js`
const cMapUrl = `${baseUrl}/cmaps/`
const pdfjsDistConfig: PdfjsDistConfigType = {
  workerSrc,
  cMapUrl
}

const pdfPreview = pdfPreviewBuilder(pdfjsDistConfig)

/**
 * 加载pdf文件，并完整渲染
 *
 * @param pdfUrl pdf地址
 * @param scale 缩放比
 * @param pdfRenderContainerDom 渲染pdf的容器dom节点
 */
export function loadPdfAndRender(pdfConfig: PdfPreviewConfig) {
  return pdfPreview.loadPdfAndRender(pdfConfig)
}

/**
 * 获取pdf预览的操作信息
 *
 * @param pdfConfig pdf预览配置信息
 */
export function loadPdfDocOperateInfo(pdfConfig: PdfPreviewConfig) {
  return pdfPreview.loadPdfDocOperateInfo(pdfConfig)
}

/**
 * 绘制水印, 并返回水印的canvas
 *
 * @return  {HTMLCanvasElement}  水印的canvas
 */
export function drawWatermark() {
  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.rotate((-18 * Math.PI) / 180)
  ctx.font = '14px Vedana'
  ctx.fillStyle = '#ffccc7'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('大王我是张飞呀', 0, 50)

  return canvas
}
