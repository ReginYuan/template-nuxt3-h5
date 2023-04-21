<template>
  <div v-if="isApp">
    <div class="header">
      <van-icon name="arrow-left" @click="goBack" />
      <span>企业加入邀请</span>
      <span></span>
    </div>
    <div class="top">
      <div class="name">
        {{ companyName }}
      </div>
      <div class="title">公司同事都在使用筑数合宝，优质商机等你发现</div>
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            label-align="top"
            v-model="form.phone"
            name="手机号"
            label="手机号"
            placeholder="请输入您的手机号"
            required
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            label-align="top"
            v-model="form.code"
            name="验证码"
            label="验证码"
            required
            placeholder="请输入验证码"
            maxlength="4"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <div
                @click="sendCode"
                :class="codeMsg == '获取验证码' ? 'click' : 'click-disable'"
              >
                {{ codeMsg }}
              </div>
            </template>
          </van-field>
          <van-field
            label-align="top"
            v-model="form.name"
            name="真实姓名"
            label="真实姓名"
            placeholder="请输入真实姓名"
            required
            :rules="[{ required: true, message: '请填写真实姓名' }]"
          />
          <van-field
            label-align="top"
            v-model="form.reason"
            name="申请理由"
            label="申请理由"
            placeholder="请输入申请理由"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            block
            type="primary"
            native-type="submit"
            style="font-size: 16px"
          >
            提交申请
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
  <div v-else>
    <img class="image" src="~/assets/img/pic-share2.png" alt="" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive, readonly, onMounted } from 'vue'
import {
  h5joinCompanyCheck,
  code,
  h5applyToJoinCompanySubmission
} from '~/server/api/joinEnterprise'  
import {
  hideNav,
  closewebView,
  isAppCharacteristic
} from '~/composables/utils/validate'
definePageMeta({ layout: false })
const router = useRouter()

const form = reactive({
  phone: undefined,
  code: undefined,
  name: undefined,
  reason: undefined,
  companyNo: undefined
})
const disabled = ref(false)
const codeMsg = ref('获取验证码')
const codeNum = ref(60)
const companyName = ref()
const isApp = ref()
//提交申请
const onSubmit = values => {
  console.log(form, 'form')
  const data = {
    phone: form.phone,
    smsCode: form.code,
    realName: form.name,
    reason: form.reason,
    companyNo: form.companyNo,
    source: '3'
  }
  console.log(data, 'data')
  h5applyToJoinCompanySubmission(data).then(res => {
    console.log(res, 'res')
    if (res.code == 200) {
      router.push('/joinEnterprise/succeed')
    }
  })
}
//发送验证码
const sendCode = () => {
  // 验证手机号格式是否正确
  var Reg = /^[1][34578][0-9]{9}$/
  if (form.phone) {
    if (Reg.test(form.phone)) {
      const params = {
        phonenumber: form.phone
      }
      code(params).then(res => {
        if (res.code == 200) {
          showSuccessToast('验证码发送成功')
          // 禁用按钮
          disabled.value = true
          // 倒计时
          let timer = setInterval(() => {
            --codeNum.value
            codeMsg.value = `重新发送(${codeNum.value})`
          }, 1000)
          // 判断什么时候停止定时器
          setInterval(() => {
            clearInterval(timer)
            codeNum.value = 60
            disabled.value = false
            codeMsg.value = '获取验证码'
          }, 60000)
        }
      })
    } else {
      showFailToast('手机号格式错误')
    }
  } else {
    showFailToast('请填写手机号')
  }
}
//返回上一级
const goBack = () => {
  router.go(-1)
  closewebView()
}
const getList = async () => {
  const route = useRoute()
  const companyNo = route.query.companyNo
  console.log(route.query, 'route')
  const params = { companyNo: companyNo }
  const list = await h5joinCompanyCheck(params)
  companyName.value = list.data.companyName
  form.companyNo = list.data.companyNo
}
onMounted(() => {
  console.log(isAppCharacteristic(), 'isAppCharacteristic()')
  //app里是true 不在是false
  isApp.value = !isAppCharacteristic()
  // isApp.value = false
  console.log(isApp.value, 'isApp.value')
  hideNav()
  getList()
})
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
.top {
  margin-left: 30px;
  margin-top: 30px;
  .name {
    width: 286px;
    /* height: 30px; */
    font-size: 20px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #222229;
    line-height: 30px;
  }
  .title {
    width: 80%;
    height: 16px;
    font-size: 12px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #888889;
    line-height: 16px;
    margin-top: 10px;
  }
}

.content {
  margin-top: 15px;
  .van-button--primary {
    background-color: #1f46b6;
  }
  .van-button {
    margin-top: 40px;
  }
  .click-disable {
    pointer-events: none;
    color: #ccc;
  }
  .click {
    color: #1f46b6;
  }
  ::v-deep .van-field__label {
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
  }
  ::v-deep .van-field__body {
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #b2bac6;
    margin-top: 10px;
  }
  ::v-deep .van-cell {
    display: block;
  }
}
::v-deep .van-cell {
  overflow: hidden;
}
img.image {
  width: 100%;
  height: 100vh;
}
</style>
