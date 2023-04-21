<template>
  <HeaderBar title="老板智库" :parentId="Id"></HeaderBar>
  <div>
    <van-tabs
      v-model:active="active"
      :ellipsis="false"
      @click-tab="onChange"
      swipeable
      @change="onChange"
      sticky
      offset-top="23.5vw"
    >
      <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <swipers v-if="showSwiper"></swipers>
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in itemList" :key="index">
              <ItemList :list="item"></ItemList>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getInfo, informationList } from '~/server/api/user'
import { Tabtype, ItemListType } from '~/types/itemList'
let Id = ref('1636282537209352194')
const active = ref(0)

// 获取tab栏数据
let tabList = ref<Tabtype[]>([])
const getTypeList = async () => {
  const { data } = await getInfo({ parentId: Id.value })
  tabList.value = JSON.parse(JSON.stringify(data))
  tabList.value.unshift({
    inforTypeId: '',
    parentId: Id.value,
    name: '推荐',
    level: 1,
    sortBy: 0
  })
}

// 获取列表数据
let itemList = ref<ItemListType[]>([])
let showSwiper = ref(true)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
let page = ref({
  levelOne: Id.value,
  levelTwo: '',
  recommend: '',
  pageSize: 20,
  pageNum: 1
})
const onChange = (info: any) => {
  if (typeof info === 'object') {
    info = tabList.value.findIndex(item => item.name === info.title)
  }
  page.value.levelOne = tabList.value[info].parentId
  page.value.levelTwo = tabList.value[info].inforTypeId
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
  if (page.value.levelTwo === '') {
    page.value.recommend = 'Y'
    showSwiper.value = true
  } else {
    page.value.recommend = ''
    showSwiper.value = false
  }
  const { data } = await informationList({ ...page.value, key: Date.now() })
  if (refreshing.value) {
    itemList.value = []
    refreshing.value = false
    if (data.records) {
      showToast('刷新成功')
    }
  }
  itemList.value.push(...data.records)
  page.value.pageNum++
  loading.value = false
  if (data.records.length < page.value.pageSize) finished.value = true
}
onMounted(async () => {
  getTypeList()
})
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img/bg-hand-yellow.png') no-repeat;
  background-size: 100% 100%;
}
:deep(.van-tab__text) {
  color: #888888;
  font-size: 18px;
}
:deep(.van-tab--active) {
  .van-tab__text {
    position: relative;
    color: #000000;
    &::after {
      content: '';
      width: 80%;
      height: 5px;
      border-radius: 7px;
      background-image: linear-gradient(
        to right,
        #ffa432,
        rgba($color: #edb469, $alpha: 0)
      );
      position: absolute;
      bottom: -7px;
      left: 10%;
    }
  }
}

:deep(.van-cell) {
  padding: 0;
}
:deep(.van-tabs__line) {
  display: none;
}
:deep(.van-tabs) {
  margin-top: 88px !important;
}
:deep(.van-pull-refresh) {
  min-height: calc(100vh - 133px);
}
</style>
