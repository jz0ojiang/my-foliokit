import type { ProjectsCollectionItem as BaseProjectsCollectionItem } from '@nuxt/content'

export interface ProjectsCollectionItem extends BaseProjectsCollectionItem {
  title: string
  description?: string
  date: Date
  endDate?: string
  cover?: string
  tags?: string[]
  link?: string
  top?: boolean
  draft?: boolean
  weight?: number
  ai?: boolean
  abbrlink?: string
  lang?: string
  content?: string
  _path?: string
}

export interface Project {
  id: string
  title: string
  description?: string
  content?: string
  cover?: string
  date: Date
  endDate?: string | Date
  top?: boolean
  tags?: string[]
  abbrlink: string
  lang?: string
  _path?: string
} 