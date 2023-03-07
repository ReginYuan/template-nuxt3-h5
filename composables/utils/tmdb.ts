import { $fetch } from 'ohmyfetch'
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'
import { showSuccessToast, showFailToast } from 'vant'
import errorCode from '~/composables/utils/errorCode'
import { getToken } from '~/composables/utils/auth'
import { tansParams } from '~/composables/utils/validate'
import cachea from '~/composables/utils/cache'
const apiBaseUrl = import.meta.env.VITE_APP_BASE_API

const cache = new LRU({
  max: 500,
  ttl: 2000 * 60 * 60 // 2 hour
})

// 是否显示重新登录
export let isRelogin = { show: false }

// 定义请求投以及请求方式
type configType = {
  method?: 'GET' | 'POST' | 'PUT'
  header?:
    | {
        isToken: false
        Authorization: string
      }
    | any
}

/**核心请求 */
function _fetchTMDB(
  url: string,
  config: Record<
    string,
    string | number | Object | undefined | configType | any
  >,
  params: Record<string, string | number | Object | undefined | any> = {}
) {
  return $fetch(url, {
    headers: config.headers,
    method: config.method,
    baseURL: `${apiBaseUrl}`,
    params,
    // 请求拦截器
    onRequest({ request, options }) {
      console.log('options', options)
      // 是否需要设置 token
      const isToken = (options.headers || {})?.isToken === false
      debugger
      if (getToken() && !isToken) {
        // options?.headers?.Authorization = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        config.headers.Authorization = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
    },

    // 响应拦截
    onResponse({ response }) {
      // // const userStore = useUserStore()

      console.log('response', response)
      let res = response
      // 未设置状态码则默认成功状态
      const code = res._data.code || 200
      // 获取错误信息
      const msg = errorCode[code] || res._data.msg || errorCode['default']
      // 二进制数据则直接返回
      // if (res.type === 'blob' || res.type === 'arraybuffer') {
      //   return res._data
      // }
      if (code === 401) {
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      } else if (code === 500) {
        showFailToast({
          message: msg
        })
        return Promise.reject(new Error(msg))
      } else if (code === 601) {
        showFailToast({
          message: msg
        })
        return Promise.reject(new Error(msg))
      } else if (code !== 200) {
        showFailToast({
          message: msg
        })
        return Promise.reject('error')
      } else {
        return Promise.resolve(res._data)
      }
    },
    // 错误处理
    onResponseError({ request, options, response }) {
      // debugger
      // console.log('err' + request)
      // console.log('err' + options)
      // console.log('err' + response)
      // let { message } = error
      // if (message == 'Network Error') {
      //   message = '后端接口连接异常'
      // } else if (message.includes('timeout')) {
      //   message = '系统接口请求超时'
      // } else if (message.includes('Request failed with status code')) {
      //   message = '系统接口' + message.substr(message.length - 3) + '异常'
      // }
      // showFailToast({
      //   duration: 0,
      //   forbidClick: true,
      //   message: message
      // })
      // return Promise.reject(error)
    }
  })
}
/**二次封装 */
export function fetchTMDB(
  url: string,
  config: Record<string, string | number | Object | undefined | any>,
  params: Record<string, string | number | undefined> = {}
): Promise<any> {
  const hash = ohash([url, config, params])
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchTMDB(url, config, params).catch(e => {
        cache.delete(hash)
        throw e
      })
    )
  }
  return cache.get(hash)!
}
