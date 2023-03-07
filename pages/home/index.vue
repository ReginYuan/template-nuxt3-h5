<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getInfo } from '~/server/api/user'
// 获取组件的实例
const listData = ref()
const lsitAll = async () => {
   const params = { pageNuaaaaam: 80, pageaaaaaa: 10 }
   const list = await getInfo(params)
   listData.value = list
   console.log('list', list)
}
// 获取组件的实例
const imageList = ref([
   'https://img1.baidu.com/it/u=1670045137,1956860080&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
   'https://img1.baidu.com/it/u=1670045137,1956860080&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
])
onMounted(() => {
   lsitAll()
})
</script>

<template>
   <div class="home min-h-screen">
      <h1>我最帅</h1>
      <h5>接口返回数据：{{ listData }}</h5>
      <img class="lazy" v-for="img in imageList" v-lazy="img" />
   </div>
</template>

<style scoped>
.home {
   display: flex;
   flex-direction: column;
}

.lazy {
   width: 80px !important;
   height: 80px !important;
}
</style>
