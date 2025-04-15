import type { ProjectsCollectionItem, Project } from '@/types/project'

// 格式化日期
// 如果日期为present，则返回present
// 如果日期为空，则返回null
// 否则返回日期
const formatDate = (date: string | undefined) => {
  if (date === 'present') return 'present'
  if (date) return new Date(date)
  return undefined
}

// get projects
export const getProjects = async (lang: string, start: number = 0, limit: number = 6): Promise<Project[]> => {
  let projects: ProjectsCollectionItem[] = []
  const { data: projectsData } = await useAsyncData(() => {
      return queryCollection('projects').all()
  })
  projects = projectsData.value || []
  projects = projects.filter((project) => project.path.startsWith(`/${lang}/projects/`))
  // sort: top, weight, date
  projects.sort((a, b) => {
    // 首先比较置顶状态
    if (a.top && !b.top) return -1
    if (!a.top && b.top) return 1

    // 其次比较权重
    const weightA = a.weight ?? 5
    const weightB = b.weight ?? 5
    if (weightA !== weightB) return weightB - weightA

    // 比较日期
    const getCompareDate = (project: ProjectsCollectionItem) => {
      // 如果是进行中的项目，使用开始时间
      if (project.endDate === 'present') return new Date(project.date)
      // 如果有结束时间，使用结束时间
      if (project.endDate) return new Date(project.endDate)
      // 否则使用开始时间
      return new Date(project.date)
    }

    return getCompareDate(b).getTime() - getCompareDate(a).getTime()
  })
  // 保留部分字段
  const processedProjects = projects.map((project) => {
    // 从 id 中提取有意义的路径部分
    // 例如：'projects/zh/projects/sample-project.md' -> 'sample-project'
    const idMatch = project.id.match(/\/projects\/([^/]+?)(?:\.md)?$/);
    const idBasedPath = idMatch ? idMatch[1] : '';
    
    // 确定最终的 abbrlink
    let finalAbbrlink = '';
    if (project.abbrlink && project.abbrlink !== 'projects') {
      // 如果有有效的 abbrlink，使用它
      finalAbbrlink = project.abbrlink;
    } else if (idBasedPath && idBasedPath !== 'projects') {
      // 否则使用从 id 提取的路径
      finalAbbrlink = idBasedPath;
    } else {
      // 最后使用 id 的后8位作为后备
      finalAbbrlink = project.id.slice(-8);
    }
    
    const processedProject = {
      id: project.id,
      title: project.title,
      cover: project.cover,
      date: project.date,
      endDate: formatDate(project.endDate),
      top: project.top,
      tags: project.tags,
      abbrlink: finalAbbrlink,
    };
    return processedProject;
  });
  if (limit === -1) {
    return processedProjects
  }
  
  return processedProjects.slice(start, start + limit);
}


export const getProjectsByTag = async (lang: string, tag: string) => {
  const projects = await getProjects(lang, 0, -1)
  return projects.filter((project) => project.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
}

export const getProjectNameByAbbrlink = async (lang: string, abbrlink: string) => {
  const { data: projectData } = await useAsyncData<ProjectsCollectionItem | null>(
    `project-${abbrlink}-${lang}`,
    async () => {
      const identifier = abbrlink as string
      const path = `/${lang}/projects/${identifier}`
      console.log('path', path)
      // 直接通过路径查找项目
      const { data } = await useAsyncData(
        `project-by-path-${path}`,
        () => queryCollection('projects')
          .where('path', '=', path)
          .first()
      )
  
      if (data.value) {
        console.log('Found project by path:', path)
        return data.value
      }
  
      // 如果通过路径没找到，尝试通过 abbrlink 查找
      const { data: abbrlinkData } = await useAsyncData(
        `project-by-abbrlink-${identifier}`,
        () => queryCollection('projects')
          .where('abbrlink', '=', identifier)
          .first()
      )
  
      if (abbrlinkData.value) {
        console.log('Found project by abbrlink:', identifier)
        return abbrlinkData.value
      }
  
      console.log('No project found for:', { identifier, path })
      return null
    }
  )
  return projectData.value?.title
}

