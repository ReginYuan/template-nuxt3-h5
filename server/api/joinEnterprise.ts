import { fetchTMDB } from '~/composables/utils/tmdb'
// h5-加入企业校验
export function h5joinCompanyCheck(params: any) {
  /**
   *参数
   *接口 string
   *配置请求方式和请求头数据 object
   *传递数据 object
   */
  return fetchTMDB(
    'system/companyAndUserRefine/h5joinCompanyCheck',
    {
      method: 'get',
      headers: {
        isToken: false
      }
    },
    params,
    {}
  )
}
// 获取验证码
export function code(params: any) {
  return fetchTMDB(
    'resource/sms/code',
    {
      method: 'get',
      headers: {
        isToken: false
      }
    },
    params,
    {}
  )
}
// 提交申请
export function h5applyToJoinCompanySubmission(data: any) {
  return fetchTMDB(
    'system/companyAndUserRefine/h5applyToJoinCompanySubmission',
    {
      method: 'post',
      headers: {
        isToken: false
      }
    },
    {},
    data
  )
}
