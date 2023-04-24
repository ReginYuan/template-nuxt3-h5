<template>
  <div class="navbar">
    <div class="container">
      头部
    </div>
  </div>
  <div class="w-[100%] h-[80px]">

  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { NButton, NIcon, NDropdown, NAvatar } from 'naive-ui';
import { Search } from '@vicons/ionicons5'
import { userOptionsType, menuType } from '~/types/navBar-type'

// 获取路由地址
const route = useRoute()

// 获取路由对象
const router = useRouter()

const userOptions = ref<userOptionsType[]>([
  {
    label: '用户资料',
    key: 'center'
  },
  {
    label: '退出',
    key: 'logout'
  }
])


const menus = ref<menuType[]>([])


const handleOpen = (path: string) => {
  navigateTo(path)
}
</script>

<style>
.navbar {
  z-index: 1000;
  @apply bg-white fixed top-0 left-0 right-0 shadow-sm flex h-[60px];
}
</style>