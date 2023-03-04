import { $fetch } from 'ohmyfetch'
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'
import type {  Media, PageResult } from '@/types/useType'

const apiBaseUrl = import.meta.env.VITE_APP_BASE_API

const cache = new LRU({
  max: 500,
  ttl: 2000 * 60 * 60 // 2 hour
})

function _fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}) {
  return $fetch(url, {
    baseURL: `${apiBaseUrl}`,
    params,
  })
}

export function fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}): Promise<any> {
  const hash = ohash([url, params])
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchTMDB(url, params)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)!
}

export function listMedia( query: string, page: number): Promise<PageResult<Media>> {
  return fetchTMDB(`/${query}/${page}`)
}
