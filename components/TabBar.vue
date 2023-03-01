<template>
    <div class="page-footer">
        <van-tabbar :route="true" v-model="active" active-color="rgb(197, 66, 34)">
            <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
            <van-tabbar-item replace to="/news" icon="chat-o">消息</van-tabbar-item>
            <van-tabbar-item replace to="/me" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const active = ref(0);
</script>
<style scoped>
.page-footer {
    width: fit-content;
    /* height: 100%; */
}
</style>