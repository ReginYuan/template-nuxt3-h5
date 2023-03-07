import { fetchTMDB } from '~/composables/utils/tmdb'
// 获取用户详细信息
export function getInfo(params: any) {
  return fetchTMDB(
    '/system/notice/list',
    {
      method: 'get',
      headers: {
        isToken: false
      }
    },
    params
  )
}
