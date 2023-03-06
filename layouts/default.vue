<template>
  <div class="body bg-gray-100 flex flex-col min-h-screen">
    <HeaderBar></HeaderBar>
    <main class="main m-auto">
      <slot />
    </main>
    <TabBar></TabBar>
    <!-- 开启底部安全区适配 -->
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>