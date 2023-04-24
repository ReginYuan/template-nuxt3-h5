import { $fetch } from 'ohmyfetch'
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'
// import { showFailToast , showToast } from 'vant'
import errorCode from '~/utils/errorCode'
import { getToken } from '~/utils/auth'
const apiBaseUrl = '/api'

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
  params: Record<string, string | number | Object | undefined | any> = {},
  body: Record<string, string | number | Object | undefined | any> = {}
) {
  if (config.method === 'get') {
    return $fetch(url, {
      headers: config.headers,
      method: config.method,
      baseURL: `${apiBaseUrl}`,
      params,
      // 请求拦截器
      onRequest({ request, options }) {
        // 是否需要设置 token
        const isToken = options.headers?.isToken || false
        if (getToken() && isToken) {
          // 让每个请求携带自定义token 请根据实际情况自行修改
          config.headers.Authorization = 'Bearer ' + getToken()
        }
      },

      // 响应拦截
      onResponse({ response }) {
        // 未设置状态码则默认成功状态
        // let data = JSON.parse(response._data)
        let data = response._data
        // let data = response._data
        const code = data.code || data.statusCode || 200
        // 获取错误信息
        const msg = (errorCode as any)[code] || data.msg || errorCode['default']
        if (code === 401) {
          // showFailToast({
          //   message: msg
          // })

          // 判断是ios环境还是安卓的环境
          let us = navigator.userAgent
          let isAndroid = us.indexOf('Android') > -1 || us.indexOf('Linux') > -1
          let isIOS =
            us.indexOf('ios_app') > -1 ||
            !!us.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          if (process.client) {
            if (window) {
              // reload 是刷新的方法
              // 如果是在安卓环境下就调用对应返回安卓登录界面的方法
              if ((window as any).androidInterface && isAndroid) {
                const token = (window as any).androidInterface.getToken()
                // showFailToast({
                //   message: token
                // })
                return
              }

              // 如果是在ios环境下就调用对应返回ios登录界面的方法
              if (
                (window as any).webkit &&
                (window as any).webkit.messageHandlers.reload &&
                isIOS
              ) {
                // ;(window as any).webkit.messageHandlers.reload.postMessage('')
                return
              }
              // location.reload()
            }
          }
          return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          // showFailToast({
          //   message: msg
          // })
          return Promise.reject(new Error(msg))
        } else if (code === 601) {
          // showFailToast({
          //   message: msg
          // })
          return Promise.reject(new Error(msg))
        } else if (code !== 200) {
          // showFailToast({
          //   message: msg
          // })
          return Promise.reject('error')
        } else {
          return Promise.resolve(data)
        }
      }
    })
  } else {
    return $fetch(url, {
      headers: config.headers,
      method: config.method,
      baseURL: `${apiBaseUrl}`,
      body,
      // 请求拦截器
      onRequest({ request, options }) {
        // 是否需要设置 token
        const isToken = options.headers?.isToken || false
        if (getToken() && isToken) {
          // 让每个请求携带自定义token 请根据实际情况自行修改
          config.headers.Authorization = 'Bearer ' + getToken()
        }
      },

      // 响应拦截
      onResponse({ response }) {
        // 未设置状态码则默认成功状态
        // let data = JSON.parse(response._data)
        let data = response._data
        console.log('response', response)
        // let data = response._data
        const code = data.code || data.statusCode || 200
        // 获取错误信息
        const msg = (errorCode as any)[code] || data.msg || errorCode['default']
        if (code === 401) {
          // showFailToast({
          //   message: msg
          // })

          // 判断是ios环境还是安卓的环境
          let us = navigator.userAgent
          console.log(us)
          let isAndroid = us.indexOf('Android') > -1 || us.indexOf('Linux') > -1
          let isIOS =
            us.indexOf('ios_app') > -1 ||
            !!us.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          if (window) {
            // reload 是刷新的方法
            // 如果是在安卓环境下就调用对应返回安卓登录界面的方法
            if ((window as any).androidInterface && isAndroid) {
              const token = (window as any).androidInterface.getToken()
              // showFailToast({
              //   message: token
              // })
              return
            }

            // 如果是在ios环境下就调用对应返回ios登录界面的方法
            if (
              (window as any).webkit &&
              (window as any).webkit.messageHandlers.reload &&
              isIOS
            ) {
              // ;(window as any).webkit.messageHandlers.reload.postMessage('')
              return
            }
            // location.reload()
          }
          return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          // showFailToast({
          //   message: msg
          // })
          return Promise.reject(new Error(msg))
        } else if (code === 601) {
          // showFailToast({
          //   message: msg
          // })
          return Promise.reject(new Error(msg))
        } else if (code !== 200) {
          // showFailToast({
          //   message: msg
          // })
          return Promise.reject('error')
        } else {
          return Promise.resolve(data)
        }
      }
    })
  }
}
/**二次封装 */
export function fetchTMDB(
  url: string,
  config: Record<string, string | number | Object | undefined | any>,
  params: Record<string, string | number | undefined> = {},
  body: Record<string, string | number | undefined> = {}
): Promise<any> {
  let hash = ohash([])
  if (config.method === 'get') {
    hash = ohash([url, config, params])
  } else {
    hash = ohash([url, config, params, body])
  }
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchTMDB(url, config, params, body).catch(e => {
        cache.delete(hash)
        throw e
      })
    )
  }
  return (cache as any).get(hash)!
}
