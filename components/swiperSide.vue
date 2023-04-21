<template>
  <div class="industry_recommend" v-if="props.hotList.length > 0">
    <div class="hot_header">
      <img src="~/assets/img/icon-hot.png" alt="" />
    </div>
    <div class="hot_titile" v-for="(item, index) in props.hotList">
      <div class="hot_titile-item" @click="toDetail(item.inforId)">
        <img v-if="index === 0" src="~/assets/img/icon-one.png" alt="" />
        <img v-if="index === 1" src="~/assets/img/icon-two.png" alt="" />
        <img v-if="index === 2" src="~/assets/img/icon-three.png" alt="" />
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
  <swiper
    v-if="swiperList?.length > 0"
    :loop="swiper_options.loop"
    :speed="swiper_options.speed"
    :spaceBetween="swiper_options.spaceBetween"
    :coverflowEffect="swiper_options.coverflowEffect"
    :centeredSlides="swiper_options.centeredSlides"
    effect="coverflow"
    :loopAdditionalSlides="3"
    :loopedSlides="1"
    slidesPerView="auto"
    :options="swiperOptions"
    :pagination="{ clickable: true }"
    :autoplay="true"
    :delay="100"
    :disableOnInteraction="false"
    @touchstart.native="touchStart"
  >
    <swiper-slide
      :style="{ width: '330px', height: '188px' }"
      v-for="(item, index) in swiperList"
      :key="index"
      @click="toDetail(item.inforId)"
      ><img :src="item.coverLink" alt=""
    /></swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, A11y } from 'swiper'
// 进入分页器相关样式
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper所需组件
import { bannerInfo } from '~/server/api/user'
import { ItemListType } from '~/types/itemList'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Autoplay, EffectCoverflow, Pagination, A11y])
const modules = [Pagination, A11y, Autoplay]
const props = defineProps<{ hotList: ItemListType[] }>()
watch(
  () => props,
  (newValue, oldValue) => {},
  { immediate: true, deep: true }
)
let swiper_options = reactive({
  // autoplay: {
  //   disableOnInteraction: true, // 鼠标滑动后继续自动播放
  //   delay: 2000 // 1秒切换一次
  // },
  speed: 500, //切换过渡速度
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true, //设置slide居中
  spaceBetween: 0,
  coverflowEffect: {
    rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
    stretch: -10, //每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。
    depth: 50, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
    modifier: 2.5, //depth和rotate和stretch的倍率，相当于            depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
    slideShadows: false //开启slide阴影。默认 true。
  }
})
let swiperOptions = reactive({
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
})

let swiperList = ref<ItemListType[]>([])
onMounted(async () => {
  const { data } = await bannerInfo({
    levelOne: '1636282443407937538',
    recommend: 'Y'
  })
  swiperList.value = data?.slice(0, 3)
})

const router = useRouter()
const toDetail = (inforId: string) => {
  router.push({
    name: 'details-id',
    params: { id: inforId }
  })
}
const touchStart = (e: any) => e.stopPropagation()
</script>

<style scoped lang="scss">
.industry_recommend {
  .hot_header {
    padding: 10px 16px 5px;
  }
  .hot_titile {
    font-size: 16px;
    color: #222222;
    padding: 0px 16px;
    .hot_titile-item {
      line-height: 36px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      img {
        vertical-align: middle;
        margin-right: 8px;
        margin-bottom: 2px;
      }
    }
  }
}
.swiper {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
}
:deep(.swiper-pagination) {
  left: 35%;
  bottom: 8px;
}
:deep(.swiper-pagination-bullet-active) {
  width: 12px !important;
  height: 4px;
  border-radius: 2px;
  background: #ffffff !important;
}
:deep(.swiper-pagination-bullet) {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: rgba($color: #ffffff, $alpha: 0.6);
  margin: 0 2px !important;
}
</style>
