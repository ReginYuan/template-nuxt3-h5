import { defineStore } from 'pinia'

export const user = defineStore('user', {
  state: () => {
    return { name: '李小龙', age: 100, sex: 'male', token: 'xxx' }
  },
  // 开启数据持久化
  persist: true
})
