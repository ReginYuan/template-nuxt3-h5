<script setup lang="ts">
// 获取组件的实例

onMounted(() => {
   function middleware({ store, route, redirect, params, query, req, res }) {
      redirect('/home') // 默认跳转页面的路由
   }
})
</script>

<template>
   <div class="index">
   </div>
</template>

<style scoped>
.index {
   display: flex;
   flex-direction: column;
}
</style>
