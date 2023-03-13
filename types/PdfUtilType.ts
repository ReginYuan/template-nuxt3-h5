export interface PdfOperateInfoType {
    /**
     * 渲染指定页
     *
     * @param   {number}  pageNum  页号. 从1开始
     * @return {number} 当前渲染的页号
     *
     */
    renderPage: (pageNum: number, newPdfViewerDom?: HTMLElement) => number
    /**
     * 渲染上一页
     * @return {number} 当前渲染的页号
     */
    renderPrevPage: () => number
    /**
     * 渲染下一页
     * @return {number} 当前渲染的页号
     */
    renderNextPage: () => number
    /**
     * 更改缩放比, 并返回当前缩放比.
     * p.s. 当初始化时, 设置了width, 则调用 changeScale 方法不会生效. 返回的缩放比永远是1
     *
     * @param   {number}  scale  缩放比. 最小0.5
     * @return {number} 当前缩放比
     */
    changeScale: (scale: number, newPdfViewerDom?: HTMLElement) => number
    /**
     * 总页数
     */
    totalPage: number
  }
  