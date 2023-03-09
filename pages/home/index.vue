<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
import { getList } from '~/server/api/user'
// import VuePdf from "vue-pdf"
// 获取组件的实例
const listData = ref()
const lsitAll = async () => {
   const res = await getList({})
   listData.value = res.data
}
const proxy = getCurrentInstance()
console.log('proxy', proxy)
let url = '~/public/tushu.pdf'
const numPages = ref(1)
// const getNumPages = () => {
//    let loadingTask = VuePdf.createLoadingTask(
//       url
//    );
//    loadingTask.promise.then((pdf: { numPages: number; }) => { numPages.value = pdf.numPages; }).catch((err: any) => { console.error('pdf 加载失败', err); })
// }
onMounted(() => {
   lsitAll()
   // getNumPages()
})




</script>

<template>
   <div class="home min-h-screen">
      <h1>我最帅</h1>
      <h5>接口返回数据: </h5>
      <div class=" flex-grow ">
         <div v-for="item in listData" :key="item._id">
            <h5>{{ item.name }}</h5>
            <img class="lazy" v-lazy="item.imgURL" />
         </div>
      </div>
      <VuePdf src="~/public/tushu.pdf" :page="1" />
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
