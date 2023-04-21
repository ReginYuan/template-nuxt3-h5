<template>
  <div>
    <!-- 头部区域 -->
    <div class="header">
      <van-icon name="arrow-left" @click="goBack()" />
      <span>企业加入邀请</span>
      <span></span>
    </div>
    <van-icon name="checked" />
    <div class="success">提交成功</div>
    <div class="title">您的企业认证申请已提交，平台正在审核中，请耐心等待</div>
    <div style="margin: 16px">
      <van-button block type="primary">下载筑数合宝APP</van-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
definePageMeta({ layout: false })
const router = useRouter()
//返回上一级
const goBack = () => {
  router.go(-1)
}
</script>
<style scoped lang="scss">
.header {
  /* background-color: #ccc; */
  /* height: 88px; */
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  padding: 50px 21px 0 21px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #141419;
  line-height: 26px;
  span {
    margin-left: 12px;
  }
  .van-icon-arrow-left {
    margin-top: 4px;
    font-size: 20px;
  }
}
.van-icon-checked {
  color: #07c160;
  font-size: 70px;
  margin-left: 41%;
  margin-top: 40px;
}
.success {
  width: 100%;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #000000;
  line-height: 36px;
  text-align: center;
  margin-top: 20px;
}
.title {
  width: 70%;
  height: 51px;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ccd6cb;
  line-height: 22px;
  margin-left: 15%;
  text-align: center;
  margin-top: 20px;
}

.van-button--primary {
  background-color: #1f46b6;
  margin-top: 150px;
}
</style>
