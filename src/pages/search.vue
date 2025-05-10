<template>
  <div class="search-results">
    <h1 class="search-title">
      {{ t('search.results_for', { query: route.query.q }) }}
    </h1>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>
    
    <div v-else-if="results.length === 0" class="no-results">
      <p class="no-results-text">{{ t('search.no_results') }}</p>
    </div>
    
    <div v-else class="results-container">
      <div v-for="project in results" :key="project.id" 
           class="project-card group">
        <h2 class="project-title">
          <NuxtLink :to="`/projects/${project.abbrlink}`" class="project-link">
            <span v-html="highlightText(project.title, searchQuery)"></span>
          </NuxtLink>
        </h2>
        
        <div class="tags-container">
          <CommonTag v-for="tag in project.tags" :key="tag" :tag="tag" class="tag-item" />
        </div>
        
        <div class="project-content" 
             v-html="getHighlightedContent(project)">
        </div>
        
        <div class="project-footer">
          <time :datetime="formatDate(project.date)">{{ formatDate(project.date) }}</time>
          <span class="separator">·</span>
          <NuxtLink :to="`/projects/${project.abbrlink}`" 
                   class="read-more-link">
            {{ t('search.read_more') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectsCollectionItem } from '@/types/project'
import { searchProjects } from '@/utils/search'
import { useSeoMetaForPage } from '~/components/useSeoMetaForPage'

const route = useRoute()
const { locale, t } = useI18n()
const loading = ref(true)
const results = ref<ProjectsCollectionItem[]>([])
const searchQuery = computed(() => route.query.q as string)


useSeoMetaForPage('search', {
  title: t('search.results_for', { query: searchQuery.value }),
})
// 格式化日期
function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 高亮文本
function highlightText(text: string, query: string) {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(
    regex,
    '<span class="highlight-text">$1</span>'
  )
}

// 获取高亮的内容摘要
function getHighlightedContent(project: ProjectsCollectionItem) {
  const query = searchQuery.value.toLowerCase()
  const content = project.content || project.description || ''
  
  if (!query) return content
  
  // 查找关键词在内容中的位置
  const index = content.toLowerCase().indexOf(query)
  if (index === -1) return content
  
  // 获取关键词周围的上下文
  const start = Math.max(0, index - 100)
  const end = Math.min(content.length, index + 100)
  let excerpt = content.slice(start, end)
  
  // 添加省略号
  if (start > 0) excerpt = '...' + excerpt
  if (end < content.length) excerpt = excerpt + '...'
  
  return highlightText(excerpt, query)
}

watch(() => route.query.q, async (newQuery) => {
  console.log('Search query changed:', newQuery)
  if (newQuery) {
    loading.value = true
    try {
      results.value = await searchProjects(newQuery as string, locale.value)
      console.log('Search results:', results.value.length)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      loading.value = false
    }
  } else {
    results.value = []
  }
}, { immediate: true })
</script>

<style lang="postcss" scoped>
.search-results {    
  min-height: 85vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.search-title {
  @apply text-2xl font-bold mb-8 text-center;
}

.loading-container {
  @apply text-center py-8;
}

.loading-spinner {
  @apply animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto;
}

.no-results {
  @apply text-center py-8;
}

.no-results-text {
  @apply text-gray-600;
}

.results-container {
  @apply space-y-6;
}

.project-card {
  @apply bg-gray-800 dark:bg-gray-900 rounded-xl p-6 transition-all duration-300 hover:shadow-lg;
}

.project-title {
  @apply text-xl font-semibold mb-3;
}

.project-link {
  @apply hover:text-blue-500;
}

.tags-container {
  @apply mb-4;
}

.tag-item {
  @apply mr-2 mb-2;
}

.project-content {
  @apply text-gray-600 dark:text-gray-400 line-clamp-3 text-sm;
}

.project-footer {
  @apply mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400;
}

.separator {
  @apply mx-2;
}

.read-more-link {
  @apply text-blue-500 hover:text-blue-600 transition-colors;
}

:deep(.highlight-text) {
  @apply bg-yellow-300 dark:bg-yellow-600 font-bold px-1 rounded text-gray-900 dark:text-yellow-100;
}
</style>

<i18n lang="yaml">
zh:
  search:
    results_for: 关于 "{query}" 的搜索结果
    no_results: 没有找到相关结果
    read_more: 阅读更多
en:
  search:
    results_for: Search results for "{query}"
    no_results: No results found
    read_more: Read more
</i18n> -US