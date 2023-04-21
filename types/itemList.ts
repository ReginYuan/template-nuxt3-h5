export interface Tabtype {
  inforTypeId: string
  parentId: string
  name: string
  level: number
  sortBy: number
}

interface Labletype {
  inforId: number
  lableId: number
  lableName: string
}

export interface ItemListType {
  inforId: string
  title: string
  levelOne?: string
  levelOneName?: string
  levelTwo?: string
  levelTwoName?: string
  infoSources: string
  authorBy?: null
  briefIntroduction?: string
  content: string
  isRecommendHomePage?: string
  isRecommendBanner?: string
  coverLink: string
  createTime: string
  lables: Labletype[]
  collect?: boolean
  color?: string
  backgroundColor?: string
}
