<template>
  <div class="header" v-if="isApp">
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft">
      <template #right>
        <img src="~/assets/img/icon-send.png" alt="" @click="show = true" />
      </template>
    </van-nav-bar>
  </div>
  <div class="content">
    <PdfPage></PdfPage>
  </div>
  <!-- 分享弹层 -->
  <van-popup
    v-model:show="show"
    position="bottom"
    :close-on-click-overlay="false"
  >
    <div class="share">
      <div class="share_content">
        <div class="share_content_title">分享至</div>
        <div class="share_share">
          <div class="share_item">
            <div>
              <img src="~/assets/img/icon-wx.png" alt="" />
            </div>
            <div>微信</div>
          </div>
          <div class="share_item">
            <div>
              <img src="~/assets/img/icon-Circle-of-Friends.png" alt="" />
            </div>
            <div>朋友圈</div>
          </div>
          <div class="share_item">
            <div @click="copyUrl">
              <img src="~/assets/img/icon-copy.png" alt="" />
            </div>
            <div>复制链接</div>
          </div>
        </div>
      </div>
      <div class="cancel" @click="show = false">取消</div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { isAppCharacteristic } from '~/composables/utils/validate'
const show = ref(false)
const isApp = ref(false)
const copyUrl = () => {
  const url = window.location.href
  // 动态创建 textarea 标签
  const textarea = document.createElement('textarea')
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  // textarea.readOnly = 'readonly'
  // textarea.style.position = 'absolute'
  // textarea.style.left = '-9999px'
  // 将要 copy 的值赋给 textarea 标签的 value 属性
  textarea.value = url
  // 将 textarea 插入到 body 中
  document.body.appendChild(textarea)
  // 选中值并复制
  textarea.select()
  const result = document.execCommand('Copy')
  document.body.removeChild(textarea)
  showToast('复制成功')
  return result
}
const onClickLeft = () => history.back()
onMounted(() => {
  isApp.value = isAppCharacteristic()
})
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  padding-top: 46px;
  background-color: #ffffff;
}
:deep(.van-icon) {
  color: #222229;
  font-size: 22px;
  /* font-weight: 700; */
}
:deep(.van-nav-bar__title) {
  font-size: 18px;
  color: #141419;
  /* letter-spacing: 1px; */
}

.content {
  height: calc(100vh - 92px);
  overflow: auto;
  background-color: #ededef !important;
  // padding: 0 20px;
}
.share {
  // height: 160px;
  background-color: #f2f2f2;
  .share_content {
    background-color: #ffffff;
    height: 160px;
    margin-bottom: 8px;
    .share_content_title {
      font-size: 18px;
      color: #222222;
      line-height: 26px;
      text-align: center;
      margin: 16px 0 32px;
    }
    .share_share {
      display: flex;
      justify-content: space-evenly;
      font-size: 14px;
      color: #000000;
      .share_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          margin-bottom: 8px;
        }
      }
    }
  }
  .cancel {
    height: 64px;
    line-height: 64px;
    text-align: center;
    background-color: #ffffff;
    color: #222222;
    font-size: 17px;
  }
}
</style>
