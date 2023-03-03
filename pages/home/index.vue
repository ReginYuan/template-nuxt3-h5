<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { listMedia } from "~~/composables/utils/tmdb";
// 获取组件的实例
const listData = ref()
const lsitAll = async () => {
   const list = await listMedia('movie', 'popular', 1)
   listData.value = list
   console.log('list', list)
}
onMounted(() => {
   lsitAll()
})
</script>

<template>
   <div class="home">
      <h1>我最帅</h1>
      <h5>接口返回数据：{{ listData }}</h5>
   </div>
</template>

<style scoped>
.home {
   display: flex;
   flex-direction: column;
}
</style>
