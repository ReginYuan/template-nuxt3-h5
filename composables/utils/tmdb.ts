import { $fetch } from 'ohmyfetch'
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { Media, MediaType, PageResult } from '@/types/useType'

const apiBaseUrl = import.meta.env.VITE_APP_BASE_API

const cache = new LRU({
  max: 500,
  ttl: 2000 * 60 * 60 // 2 hour
})

function _fetchTMDB(
  url: string,
  params: Record<string, string | number | undefined> = {}
) {
  return $fetch(url, {
    baseURL: `${apiBaseUrl}/tmdb`,
    params
  })
}

export function fetchTMDB(
  url: string,
  params: Record<string, string | number | undefined> = {}
): Promise<any> {
  const hash = ohash([url, params])
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchTMDB(url, params).catch(e => {
        cache.delete(hash)
        throw e
      })
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return cache.get(hash)!
}

export function listMedia(
  type: MediaType,
  query: string,
  page: number
): Promise<PageResult<Media>> {
  return fetchTMDB(`${type}/${query}`, { page })
}
