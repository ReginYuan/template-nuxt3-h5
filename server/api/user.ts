import { fetchTMDB } from '~/utils/tmdb'
// 接口示例
export function getInfo(params: any) {
  /**
   *参数
   *接口 string
   *配置请求方式和请求头数据 object
   *传递数据 object
   */
  return fetchTMDB(
    `/zshb/informationType/typeList/${params.parentId}`,
    {
      method: 'get',
      headers: {
        isToken: true
      }
    },
    {}
  )
}

export function bannerInfo(params: any) {
  return fetchTMDB(
    '/zshb/information/bannerInfo',
    {
      method: 'get',
      headers: {
        isToken: true
      }
    },
    params
  )
}

export function informationList(params: any) {
  return fetchTMDB(
    '/zshb/information/list',
    {
      method: 'get',
      headers: {
        isToken: true
      }
    },
    params
  )
}

export function getDetail(params: any) {
  return fetchTMDB(
    `/zshb/information/details/${params.inforId}`,
    {
      method: 'get',
      headers: {
        isToken: true
      }
    },
    {},
    {}
  )
}

export function relatedArticles(params: any) {
  return fetchTMDB(
    '/zshb/information/relatedArticles',
    {
      method: 'get',
      headers: {
        isToken: true
      }
    },
    params
  )
}

export function collectApi(params: any) {
  return fetchTMDB(
    '/zshb/information/collect',
    {
      method: 'get',
      headers: {
        isToken: true
      }
    },
    params
  )
}
