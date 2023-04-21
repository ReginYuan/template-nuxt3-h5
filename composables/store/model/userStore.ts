import { defineStore } from 'pinia'
import { setToken } from '~/composables/utils/auth'
export const userStrore = defineStore('user', {
  state: () => {
    return { name: '李小龙', age: 100, sex: 'male', token: '' }
  },
  actions: {
    setToken(value: string) {
      this.$state.token = value
      setToken(value)
    }
  },
  // 开启数据持久化
  persist: true
})
