<template>
  <NConfigProvider inline-theme-disabled>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NConfigProvider>
</template>
<script setup lang="ts">
import {
  NConfigProvider
} from "naive-ui"
import { onMounted } from 'vue'
import { geTokenAll } from '~/utils/validate'
onMounted(() => {
  geTokenAll()
})
</script>