import { fetchTMDB } from '~/composables/utils/tmdb'
// 获取用户详细信息
export function getList(params: any) {
  /**
   *参数
   *接口 string
   *配置请求方式和请求头数据 object
   *传递数据 object
  */
  return fetchTMDB(
    '/api/list',
    {
      method: 'get',
      headers: {
        isToken: false
      }
    },
    params
  )
}
