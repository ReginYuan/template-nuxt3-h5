<template>
  <div class=" bg-gray-100 flex flex-col w-auto min-h-screen">
    <!-- <HeaderBar></HeaderBar> -->
    <main class="main w-auto m-auto">
      <slot />
    </main>
    <!-- <TabBar></TabBar> -->
    <!-- 开启底部安全区适配 -->
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>