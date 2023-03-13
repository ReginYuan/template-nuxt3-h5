<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { PdfOperateInfoType } from '@pzy915/pdf-preview'
import { baseUrl, loadPdfDocOperateInfo } from '@/composables/utils/PdfUtil'
import { showToast } from 'vant'

const pdfPreviewRef = ref<HTMLDivElement>()
const goPageNum = ref<string>('1')
// const isNum = computed(() => goPageNum.value.match(/^[1-4]{1}$/))
const scale = ref<number>(1)
const pdfUrl = `${baseUrl}tushu.pdf`
const pdfOperator = ref<PdfOperateInfoType>()


const widthoff = ref<number>(100)
if(process.client){
   widthoff.value = (document as any).body.offsetWidth
}
async function pdfOperatorInit() {
   if (!pdfPreviewRef.value) return
   pdfOperator.value = await loadPdfDocOperateInfo({
      pdfUrl,
      scale: scale.value,
      width: widthoff.value,
      pdfRenderContainerDom: pdfPreviewRef.value,
   })
}

// function onGoPage() {
//    if (!pdfOperator.value) return
//    console.log('isNum.value', isNum.value)
//    if (!isNum.value) {
//       showToast({
//          message: '请输入正确的页码'
//       })
//    } else {
//       pdfOperator.value.renderPage(parseInt(goPageNum.value))
//    }
// }
// 下一页
function onNextPage() {
   if (!pdfOperator.value) return
   goPageNum.value = '' + pdfOperator.value.renderNextPage()
}
// 上一页
function onPrevPage() {
   if (!pdfOperator.value) return
   goPageNum.value = '' + pdfOperator.value.renderPrevPage()
}
// 回到首页
function onFirstPage() {
   if (!pdfOperator.value) return
   goPageNum.value = '' + pdfOperator.value.renderPage(1)
}
// 最后一页
function onLastPage() {
   if (!pdfOperator.value) return
   goPageNum.value =
      '' + pdfOperator.value.renderPage(pdfOperator.value.totalPage)
}
function onChangeScale(scalePlusVal: number) {
   if (!pdfOperator.value) return
   scale.value += scalePlusVal
   scale.value = pdfOperator.value.changeScale(scale.value)
}
// 是否还有下一页
// const hasNextPage = computed(() => {
//    if (!pdfOperator.value || !isNum.value) return false
//    return parseInt(goPageNum.value) !== pdfOperator.value.totalPage
// })
// 是否还有上一页
// const hasPrevPage = computed(() => {
//    if (!pdfOperator.value || !isNum.value) return false
//    return parseInt(goPageNum.value) > 1
// })

onMounted(() => {
   pdfOperatorInit()
})

</script>

<template>
   <div class="pdfPreview">

      <div class="centerPanel">
         <div ref="pdfPreviewRef" class="pdfPreviewCanvas"></div>
      </div>
      <div class="bottomPanel">
         <div class="mb-10">
            <!-- :disabled="hasPrevPage" -->
            <van-button size="mini" @click="onFirstPage">
               首页
            </van-button>
            <van-button size="mini" @click="onPrevPage">
               上一页
            </van-button>
            <van-button size="mini" @click="onNextPage">
               下一页
            </van-button>
            <van-button size="mini" @click="onLastPage">
               尾页
            </van-button>
            <!-- <van-button size="mini" @click="onChangeScale(0.5)">放大</van-button>
                                          <van-button size="mini" @click="onChangeScale(-0.5)">缩小</van-button> -->
         </div>
         <!-- <div class="text">
                                       总页数 {{ pdfOperator?.totalPage }} 页, 当前为第 {{ goPageNum }} 页.
                                       当前缩放比:{{ scale }}
                                    </div> -->
         <!-- <div>
                                                      <van-cell-group inset>
                                                         <van-field v-model="goPageNum" placeholder="请输入页码. 页码从1开始" class="pageNumInput"></van-field>
                                                      </van-cell-group>
                                                      <van-button size="small" @click="onGoPage">跳转指定页</van-button>
                                                   </div> -->
      </div>
   </div>
</template>

<style lang="scss" scoped>
.pdfPreview {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;



   .centerPanel {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      overflow: auto;
   }

   .pdfPreviewCanvas {
      display: flex;
      flex-direction: column;
      overflow: auto;
   }

   .bottomPanel {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 20px !important;

      .mb-10 {
         display: flex;
         flex-direction: row;

      }

      text {
         margin-top: 10px;
      }

      .pageNumInput {
         width: auto;
      }
   }
}
</style>
