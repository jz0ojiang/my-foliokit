import { initSearchIndex, search, clearIndex } from '@/utils/search'

export default defineNuxtPlugin(async (nuxtApp) => {
  // 初始化搜索索引
  await initSearchIndex()
  
  return {
    provide: {
      search: {
        search,
        clearIndex
      }
    }
  }
}) 