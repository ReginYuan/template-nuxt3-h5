import { defineStore } from 'pinia'
export const historyStrore = defineStore('history', {
  state: () => {
    return {
      historylist: []
    }
  },
  actions: {
    setHistory(value: string[]) {
      this.$state.historylist = value
    }
  },
  // 开启数据持久化
  persist: true
})
