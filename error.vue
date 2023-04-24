<template>
  <div class="pt-[10%]">
    <n-result status="500" title="错误提示" :description="error.message">
      <template #footer>
        <n-button @click="handleError">回到首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
import { NResult, NButton } from "naive-ui";
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped>
</style>