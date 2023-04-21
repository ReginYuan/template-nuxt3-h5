<template>
  <!-- 产业头条 -->
  <pdfItemList
    :list="list"
    v-if="list.levelOne === '1636282673046081537'"
  ></pdfItemList>
  <!-- 一张图片 -->
  <div class="content-item" v-else-if="list?.coverLink" @click="toDetail(list)">
    <div class="text">
      <div class="title">{{ list.title }}</div>
      <div class="info">
        <div
          class="tag"
          :style="{ color: list.color, backgroundColor: list.backgroundColor }"
        >
          {{ list.infoSources }}
        </div>
        <div class="time">
          <span class="name">{{ list.authorBy }}</span
          ><i class="point" v-show="list.authorBy && list.createTime"></i
          ><span>{{ list.createTime.split(' ')[0] }}</span>
        </div>
      </div>
    </div>
    <van-image
      width="80"
      height="80"
      fit="cover"
      radius="10"
      :src="list.coverLink"
    />
  </div>
  <!-- 无图片 -->
  <div class="content-item2" v-else>
    <div class="text">
      <div class="title">{{ list.title }}</div>
      <div class="info">
        <div class="tag">{{ list.infoSources }}</div>
        <div class="time">
          {{ list.authorBy
          }}<i class="point" v-show="list.authorBy && list.createTime"></i
          >{{ list.createTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { ItemListType } from '~/types/itemList'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps<{
  list: ItemListType
  type?: string
}>()

const router = useRouter()
watch(
  () => props,
  (newValue, oldValue) => {},
  { immediate: true, deep: true }
)
const toDetail = (item: ItemListType) => {
  router.push({
    name: 'details-id',
    params: { id: item.inforId }
  })
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.content-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}
.content-item2 {
  padding: 12px 16px;
}
.text {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: 16px;
  flex: 1;
  .title {
    font-size: 16px;
    line-height: 20px;
    color: #222222;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-top: 5px;
    text-align: left;
  }
  .info {
    width: 100%;
    height: 16px;
    line-height: 16px;
    display: flex;
    justify-content: space-between;
    .tag {
      box-sizing: border-box;
      font-size: 12px;
      padding: 1px 8px;
      border-radius: 2px;
      max-width: 100px;
      text-align: center;
      overflow: hidden;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .time {
      width: 70%;
      font-size: 12px;
      color: rgba($color: #222222, $alpha: 0.5);
      display: flex;
      align-items: center;
      .name {
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
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
}
</style>
