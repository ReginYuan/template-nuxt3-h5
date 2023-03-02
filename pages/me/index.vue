<template>
   <div>
      <span>{{ name }}</span>
      <span>{{ age }}</span>
      <span>{{ sex }}</span>
      <span>{{ token }}</span>
      <br />
      <van-button size="small" @click="changeName" type="primary">changeName</van-button>
      <van-button size="small" @click="reset" type="primary">reset</van-button>
   </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import stores from "~~/composables/store/store";
const user = stores.user()
//storeToRefs可动态渲染的解构如下：
const { name, age, sex, token } = storeToRefs(user)
const changeName = () => {
   user.name = "袁修飞"
}
//重置store
const reset = () => {
   user.$reset()
}
</script>