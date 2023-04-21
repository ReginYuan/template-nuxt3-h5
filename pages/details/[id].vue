<template>
  <div class="header" v-if="isApp">
    <van-nav-bar left-arrow @click-left="onClickLeft" :clickable="false">
      <template #right>
        <van-icon
          name="star-o"
          v-show="collect === false"
          @click="onCollect(collect)"
        />
        <van-icon
          name="star"
          v-show="collect === true"
          @click="onCollect(collect)"
        />
        <img src="~/assets/img/icon-send.png" alt="" @click="show = true" />
      </template>
    </van-nav-bar>
  </div>
  <div style="height: 90px" v-if="isApp"></div>
  <div style="background-color: #f7f7f7; height: 2px"></div>
  <div class="new_content" v-if="content.data.inforId">
    <div class="title">{{ content.data.title }}</div>
    <div class="infos">
      <div class="info_tag">
        <span
          :style="{
            color: content.data.color,
            backgroundColor: content.data.backgroundColor
          }"
          >{{ content.data.infoSources }}</span
        >
      </div>
      <div class="time">
        {{ content.data.authorBy
        }}<i
          class="point"
          v-show="content.data.authorBy && content.data.createTime"
        ></i
        >{{ content.data.createTime.split(' ')[0] }}
      </div>
    </div>
    <div class="text" v-html="content.data.content"></div>
  </div>
  <!-- 标签 -->
  <div class="tag">
    <div v-for="(ele, ind) in content.data.lables" :key="ind">
      <span>{{ ele.lableName }}</span>
    </div>
  </div>
  <!-- 相关文章 -->
  <div style="background-color: #f7f7f7; height: 8px"></div>
  <div class="about" v-show="itemList.length > 0">
    <div class="title">相关文章</div>
    <van-list>
      <van-cell v-for="(item, index) in itemList" :key="index">
        <ItemList :list="item"></ItemList>
      </van-cell>
    </van-list>
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
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ItemListType } from '~/types/itemList'
import { getDetail, relatedArticles, collectApi } from '~/server/api/user'
import { isAppCharacteristic } from '~/composables/utils/validate'
const show = ref(false)
const collect = ref(false)
const route = useRoute()
let content = reactive<{ data: ItemListType }>({
  data: {
    inforId: '',
    title: '',
    levelOne: '',
    levelTwo: '',
    content: '',
    coverLink: '',
    createTime: '',
    infoSources: '',
    lables: []
  }
})
const isApp = ref(false)
let itemList = ref<ItemListType[]>([])
const getDetails = async () => {
  const { data } = await getDetail({ inforId: route.params.id })
  content.data = data
  collect.value = data.collect

  const res = await relatedArticles({ inforId: content.data.inforId })
  itemList.value = res.data
}
const onClickLeft = () => history.back()
const onCollect = async (status: boolean) => {
  if (status === true) {
    await collectApi({ inforId: content.data.inforId, collect: 1 })
  } else {
    await collectApi({ inforId: content.data.inforId, collect: 0 })
  }
  collect.value = !collect.value
}
const copyUrl = () => {
  const url = window.location.href
  // 动态创建 textarea 标签
  const textarea = document.createElement('textarea')
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  // textarea.readOnly = 'readonly'
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
onMounted(() => {
  isApp.value = isAppCharacteristic()
  getDetails()
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 46px;
  background-color: #ffffff;
  z-index: 99;
}
:deep(.van-nav-bar) {
  .van-icon-star-o:before {
    color: #222229;
    font-size: 22px;
  }
}
:deep(.van-icon-star-o:before) {
  color: #222229;
  font-size: 22px;
  margin-right: 20px;
}

:deep(.van-icon-star:before) {
  color: #fdad15;
  font-size: 22px;
  margin-right: 20px;
}

:deep(.van-icon-arrow-left) {
  color: #222229;
  font-size: 22px;
}

.new_content {
  margin-bottom: 16px;

  .title {
    padding: 12px 16px 0;
    font-size: 18px;
    color: #222222;
  }

  .infos {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin: 16px;

    .info_tag {
      span {
        padding: 0 8px;
      }
    }

    .time {
      color: rgba($color: #222222, $alpha: 0.5);

      .point {
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 3px;
        margin: 0 3px;
        background-color: #c4c4c4;
      }
    }
  }

  .text {
    box-sizing: border-box;
    padding: 0 16px;
    word-wrap: break-word;
    width: 100%;
    font-size: 16px;
    color: #222222;

    :deep(img) {
      width: 100%;
      margin: 12px 0;
    }
  }
}

.tag {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  margin-bottom: 16px;

  span {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    margin: 4px 8px;
    padding: 0 12px;
    color: #1f46b6;
    border: 1px solid #1f46b6;
    border-radius: 36px;
  }
}

.about {
  .title {
    font-size: 18px;
    color: #222222;
    padding: 16px;
  }
}
:deep(.van-cell) {
  padding: 0;
}

//分享弹层
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
