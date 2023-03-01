<template>
    <div class="header-bar">
        头部
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
    // 是否返回
    back: { type: [Boolean, String], default: true },
    // 标题
    title: { type: String, default: '' },
    // 标题颜色
    color: { type: String, default: '#fff' },
    // 背景颜色
    bgcolor: { type: String, default: '#22d59c' },
    // 标题是否居中
    center: { type: [Boolean, String], default: false },
    // 搜索框
    search: { type: [Boolean, String], default: false },
    // 是否固定
    fixed: { type: [Boolean, String], default: false },
    // 背景透明
    transparent: { type: [Boolean, String], default: false },
    // 设置层级
    zIndex: { type: [Number, String], default: '2021' },
})
</script>
  
<style scoped></style>