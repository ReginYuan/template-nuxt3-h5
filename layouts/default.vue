<template>
  <div class="body bg-gray-100 flex flex-col min-h-screen">
    <HeaderBar></HeaderBar>
    <main class="main">
      <slot />
    </main>
    <TabBar></TabBar>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>