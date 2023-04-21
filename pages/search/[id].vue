<template>
  <div class="header">
    <van-nav-bar left-arrow :clickable="false" @click-left="onClickLeft">
      <template #title>
        <van-search
          v-model="page.title"
          placeholder="搜索资讯"
          background="transparent"
          shape="round"
          @focus="onFocus"
          :clearable="false"
        >
          <template #label>
            <img src="~/assets/img/icon-search.png" alt="" />
          </template>
        </van-search>
      </template>
      <template #right>
        <span class="search" @click="searchBtn(null)">搜索</span>
      </template>
    </van-nav-bar>
  </div>
  <!-- tab栏 -->
  <div>
    <van-tabs
      v-model:active="active"
      :ellipsis="false"
      @click-tab="onChange"
      inactive-color="#222229"
      swipeable
      @change="onChange"
      sticky
      offset-top="23.5vw"
    >
      <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
        <!-- 搜索结果 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-if="isShow"
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in itemList" :key="index">
              <!-- 行业报告 -->
              <PdfItemList
                :list="item"
                v-if="item.levelOne === '1636282673046081537'"
              ></PdfItemList>
              <ItemList :list="item" v-else></ItemList>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
  <!-- 历史记录 -->
  <div v-if="!isShow" class="search_history">
    <div class="history">
      <div class="history_title">搜索历史</div>
      <div class="clear">
        <van-icon name="delete-o" />
        <span class="clear_text" @click="clearBtn">清空</span>
      </div>
    </div>
    <div class="tag">
      <div
        v-for="(item, index) in taglist"
        :key="index"
        @click="searchBtn(item)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { historyStrore } from '~/composables/store/model/history'
import { getInfo, informationList } from '~/server/api/user'
import { Tabtype, ItemListType } from '~/types/itemList'
const route = useRoute()
const active = ref(0)
let isShow = ref(false)
let tabList = ref<Tabtype[]>([])
let itemList = ref<ItemListType[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const taglist = ref<string[]>([])

let page = ref({
  title: '',
  levelOne: '',
  pageSize: 20,
  pageNum: 1
})

// 获取tab栏数据
const getTypeList = async () => {
  const { data } = await getInfo({ parentId: 0 })
  tabList.value = data
  const index = tabList.value.findIndex(
    item => item.inforTypeId === route.params.id
  )
  active.value = index
}

const onChange = (info: any) => {
  if (typeof info === 'object') {
    info = tabList.value.findIndex(item => item.name === info.title)
  }
  page.value.levelOne = tabList.value[info].inforTypeId
  itemList.value = []
  page.value.pageNum = 1
  finished.value = false
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  loading.value = true
  page.value.pageNum = 1
  onLoad()
}

const onLoad = async () => {
  const { data } = await informationList({ ...page.value, key: Date.now() })
  if (refreshing.value) {
    itemList.value = []
    refreshing.value = false
    if (data.records) {
      showToast('刷新成功')
    }
  }
  itemList.value.push(...data.records)
  loading.value = false
  page.value.pageNum++
  if (data.records.length < page.value.pageSize) finished.value = true
}

const searchBtn = (item: any) => {
  if (item) page.value.title = item
  // 存储输入框历史记录
  if (page.value.title != '') {
    taglist.value.unshift(page.value.title)
    taglist.value = [...new Set(taglist.value)].slice(0, 10)
    const store = historyStrore()
    taglist.value && store.setHistory(taglist.value)
  }
  page.value.pageNum = 1
  itemList.value = []
  isShow.value = true
  finished.value = false
}
const clearBtn = () => {
  const store = historyStrore()
  store.setHistory([])
  taglist.value = []
}
const onFocus = () => (isShow.value = false)
const onClickLeft = () => {
  history.back()
  page.value.title = ''
  isShow.value = false
}

onMounted(() => {
  taglist.value =
    JSON.parse(localStorage.getItem('history') as string)?.historylist || []
  page.value.levelOne = route.params.id as string
  getTypeList()
})
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  padding-top: 44px;
  background-color: #ffffff;
  position: fixed;
  z-index: 99;
}
:deep(.van-nav-bar) {
  font-size: 20px;
  .van-nav-bar__left {
    padding: 0 10px !important;
  }
  .van-nav-bar__title {
    min-width: 80% !important;
    .van-search {
      margin-right: 10px;
    }
    .van-search__label {
      display: flex;
      align-items: center;
    }
    .van-icon-search:before {
      content: none;
    }
  }
  .van-nav-bar__arrow {
    font-size: 20px;
    color: #222229;
  }
  .search {
    font-size: 16px;
    color: #222229;
  }
}
:deep(.van-tab__text) {
  font-size: 18px;
  color: #222229;
}
:deep(.van-tab--active) {
  .van-tab__text {
    color: #1f46b6;
  }
}
:deep(.van-tabs__line) {
  width: 60px;
  height: 2px;
  background-color: #1f46b6;
  bottom: 5px;
}
:deep(.van-tabs) {
  margin-top: 88px !important;
}
:deep(.van-pull-refresh) {
  min-height: calc(100vh - 133px);
}
.search_history {
  width: 100%;
  position: absolute;
  top: 132px;
  .history {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 24px 0;
    margin-top: 16px;
    .history_title {
      font-size: 16px;
      color: #222222;
    }
    .clear {
      font-size: 14px;
      color: #1f46b6;
      .clear_text {
        margin-left: 7px;
      }
    }
  }
  .tag {
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    margin: 16px 0;
    padding: 0 16px;
    span {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      margin: 4px;
      padding: 6px 16px;
      color: #3e3e3e;
      background-color: #f8f8f9;
    }
  }
}

:deep(.van-cell) {
  padding: 0;
}
</style>
