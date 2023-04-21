<template>
  <div class="body flex flex-col">
    <main class="main">
      <!-- <slot /> -->
      <NuxtPage keepalive></NuxtPage>
    </main>
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  KeepAlive: {
    exclude: ['industry', 'bossBank', 'IndustryReport', 'policyRule', 'search']
  }
})
</script>

<style scoped></style>
