import type { Project, ProjectsCollectionItem } from '@/types/project'
import { queryCollection } from '#imports'

let projectsCache: ProjectsCollectionItem[] | null = null

// 初始化搜索索引
export async function initSearchIndex(): Promise<ProjectsCollectionItem[]> {
  if (projectsCache) return projectsCache

  try {
    const projects = await queryCollection('projects')
      .where('draft', 'NOT LIKE', true)
      .all()
    
    if (projects) {
      projectsCache = projects as ProjectsCollectionItem[]
      console.log('Loaded projects:', projectsCache.length)
      return projectsCache
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
  }

  return []
}

// 搜索项目
export async function searchProjects(query: string, locale: string): Promise<ProjectsCollectionItem[]> {
  const projects = await initSearchIndex()
  console.log('Searching with query:', query, 'locale:', locale)
  console.log('Total projects:', projects.length)
  
  // 先按语言筛选
  const langProjects = projects.filter(project => {
    const lang = locale === 'en-US' ? 'en' : locale
    return project.path?.startsWith(`/${lang}/projects/`)
  })
  
  if (!query.trim()) return langProjects

  const searchTerms = query.toLowerCase().split(/\s+/)
  console.log('Search terms:', searchTerms)
  
  // 搜索标题和标签匹配的项目
  const titleTagResults = langProjects.filter(project => {
    const title = project.title?.toLowerCase() || ''
    const tags = project.tags?.map(tag => tag.toLowerCase()) || []
    
    return searchTerms.some(term => 
      title.includes(term) || 
      tags.some(tag => tag.includes(term))
    )
  })
  
  // 搜索内容匹配的项目
  const contentResults = await Promise.all(
    searchTerms.map(async (term) => {
      try {
        const lang = locale === 'en-US' ? 'en' : locale
        const { data } = await useAsyncData(`search-${term}`, () => 
          queryCollection('projects')
            .where('draft', 'NOT LIKE', true)
            .where('body', 'LIKE', `%${term}%`)
            .where('path', 'LIKE', `/${lang}/projects/%`)
            .all()
        )
        return data.value || []
      } catch (error) {
        console.error('Error searching content:', error)
        return []
      }
    })
  )
  
  // 合并结果
  const allResults = [...titleTagResults]
  contentResults.flat().forEach((result: any) => {
    if (!allResults.some(r => r.path === result.path)) {
      allResults.push(result)
    }
  })
  
  // abbrlink 兜底处理，参考 getProjects 逻辑
  function ensureAbbrlink(project: any) {
    if (project.abbrlink && project.abbrlink !== 'projects') return project.abbrlink;
    const path = project.path || project.id || '';
    const match = path.match(/\/projects\/([^/.]+)(?:\.md)?$/);
    if (match && match[1] && match[1] !== 'projects') return match[1];
    return (project.id || '').slice(-8);
  }
  const finalResults = allResults.map(project => ({
    ...project,
    abbrlink: ensureAbbrlink(project)
  }))
  
  console.log('Found results:', finalResults.length)
  return finalResults
}

// 搜索函数别名
export const search = searchProjects

// 清除缓存
export function clearIndex() {
  projectsCache = null
}

// 获取所有项目用于初始化
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await useAsyncData('projects', () => 
      queryCollection('projects')
        .where('draft', 'NOT LIKE', true)
        .all()
    )
    
    if (data.value && Array.isArray(data.value)) {
      return data.value.map((doc: any) => ({
        id: doc._id,
        title: doc.title,
        content: doc.body,
        tags: doc.tags || [],
        abbrlink: doc.abbrlink,
        date: doc.date
      }))
    }
    return []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
} 