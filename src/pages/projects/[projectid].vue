// projects/[project-id].vue
<template>
  <div class="page-container">
    <template v-if="projectData">
      <div ref="headerRef" class="project-header" :style="{ backgroundImage: `url(${defaultCover})` }">
        <!-- 暗色遮罩 -->
        <div class="header-overlay"></div>

        <div class="header-content">
          <h1 class="project-title">{{ projectData.title }}</h1>
          <div class="project-meta">
            <div v-if="projectData.date" class="meta-item">
              <Icon name="carbon:calendar" class="meta-icon" />
              <span>{{ new Date(projectData.date).getFullYear() }}</span>
            </div>
            <div v-if="projectData.tags" class="tags-container">
              <Tag v-for="tag in projectData.tags" :key="tag" :tag="tag" />
            </div>
            <div v-if="projectData.link" class="link-container">
              <a :href="projectData.link" target="_blank" rel="noopener noreferrer" class="project-link">
                <Icon name="carbon:launch" class="meta-icon" />
                <span>{{ t('visitLink') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!projectData?.no_ai" class="ai-banner" @click="handleAskClick">
        <Icon name="carbon:ai-status" class="banner-icon" />
        <span>{{ t('ai.askAboutProject') }}</span>
        <Icon name="carbon:arrow-right" class="arrow-icon" />
      </div>
      <div v-else class="ai-banner ai-banner--disabled">
        <Icon name="carbon:ai-status" class="banner-icon" />
        <span>{{ t('ai.askAboutProjectDisabled') }}</span>
        <Icon name="carbon:error" class="arrow-icon" />
      </div>
      <div class="content-container">
        <ContentRenderer :value="projectData">
          <template #empty>
            <p>{{ t('noContent') }}</p>
          </template>
        </ContentRenderer>
      </div>
    </template>

    <template v-else>
      <div class="not-found-container">
        <div class="not-found-code">404</div>
        <h1 class="not-found-title">{{ t('notFound.title') }}</h1>
        <p class="not-found-description">{{ t('notFound.description') }}</p>
        <div class="not-found-help">
          <p class="help-text">{{ t('notFound.suggestions') }}</p>
          <ul class="help-list">
            <li>{{ t('notFound.checkUrl') }}</li>
            <li>{{ t('notFound.checkLanguage') }}</li>
            <li>{{ t('notFound.tryOtherProjects') }}</li>
          </ul>
        </div>
        <NuxtLink to="/projects" class="back-button">
          {{ t('notFound.backToProjects') }}
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProjectsCollectionItem } from '@/types/project'
import defaultCover from '@/assets/images/default-cover.jpeg'
import { onMounted, ref } from 'vue'
import Tag from '@/components/common/Tag.vue'
import { useSeoMetaForPage } from '~/components/useSeoMetaForPage'

const { locale, t } = useI18n()
const route = useRoute()
const projectId = computed(() => route.params.projectid)
const headerRef = ref<HTMLElement | null>(null)
const localePath = useLocalePath()

// 在组件挂载后懒加载背景图
onMounted(() => {
  if (!projectData.value?.cover || !headerRef.value) return;

  // 预加载图片
  const img = new Image();
  img.onload = () => {
    // 图片加载完成后，更新背景图
    if (headerRef.value) {
      headerRef.value.style.backgroundImage = `url(${projectData.value?.cover})`;
    }
  };

  // 开始加载图片
  img.src = projectData.value.cover;
});

// 处理AI提问点击
const handleAskClick = () => {
  const path = localePath(`/ask?from=${projectData.value?.abbrlink || projectId.value}`);
  navigateTo(path);
}

const { data: projectData } = await useAsyncData<ProjectsCollectionItem | null>(
  `project-${projectId.value}-${locale.value}`,
  async () => {
    const identifier = projectId.value as string
    const path = `/${locale.value}/projects/${identifier}`

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
  },
  {
    watch: [locale]
  }
)

useSeoMetaForPage('projects', {title: projectData.value?.title})

</script>

<style lang="postcss" scoped>
.page-container {
  @apply flex flex-col w-full min-h-screen pb-24;
}

.project-header {
  @apply relative py-24 text-white bg-cover bg-center transition-opacity duration-500 bg-slate-800;
}

.header-overlay {
  @apply absolute inset-0 bg-black/50;
}

.header-content {
  @apply max-w-4xl mx-2 px-4 relative z-10;

  @screen md {
    @apply mx-auto;
  }
}

.project-title {
  @apply text-4xl font-bold mb-6;
}

.project-meta {
  @apply flex flex-col gap-2 text-slate-100;

  @screen md {
    @apply flex-row items-center gap-4;
  }
}

.meta-item {
  @apply flex items-center gap-2;
}

.meta-icon {
  @apply w-4 h-4;
}

.tags-container {
  @apply flex items-center gap-2 flex-wrap;
}

.link-container {
  @apply flex items-center gap-2;
}

.project-link {
  @apply text-blue-200 hover:text-blue-100 flex items-center gap-1;
}

.content-container {
  @apply prose max-w-4xl mx-2 px-4 py-8;

  @screen md {
    @apply mx-auto;
  }

  color: var(--color-text-primary);

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6),
  :deep(p),
  :deep(li),
  :deep(strong),
  :deep(em) {
    color: var(--color-text-primary);
  }

  :deep(a) {
    color: var(--color-link);

    &:hover {
      color: var(--color-link-hover);
    }
  }

  :deep(code) {
    color: var(--color-code);
    background-color: var(--color-surface-card);
    @apply px-2 py-1 rounded;
  }

  :deep(pre) {
    background-color: var(--color-surface-card);

    code {
      background-color: transparent;
      @apply p-0;
    }
  }

  :deep(blockquote) {
    border-color: var(--color-border);
    color: var(--color-text-secondary);
  }
}

.not-found-container {
  @apply flex flex-col items-center justify-center min-h-[70vh] text-center px-4;
}

.not-found-code {
  @apply text-9xl font-bold text-gray-200 dark:text-gray-800;
}

.not-found-title {
  @apply mt-4 text-2xl font-bold text-gray-700 dark:text-gray-300;
}

.not-found-description {
  @apply mt-2 text-gray-500 dark:text-gray-400;
}

.not-found-help {
  @apply mt-6 space-y-2;
}

.help-text {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.help-list {
  @apply text-sm text-gray-500 dark:text-gray-400 list-disc list-inside;
}

.back-button {
  @apply mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}

:deep(.prose h1) {
  @apply hidden;
}

@screen md {
  .header-content {
    @apply max-w-4xl;
  }
}

/* 标签相关样式保持不变 */
.project-tag {
  @apply px-2 py-1 text-xs rounded-md min-w-8 text-center cursor-pointer transition-all duration-200;
  background-color: var(--color-surface-card-inner);
  color: var(--color-text-primary);
  font-family: Poppins, 'LXGW WenKai', sans-serif;
  backdrop-filter: blur(6px);
}

.project-tag:hover {
  filter: brightness(0.8);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 标签颜色相关样式保持不变 */

.ai-banner {
  @apply flex items-center gap-2 px-4 py-3 bg-blue-500 text-white cursor-pointer transition-all duration-200 hover:bg-blue-600;
  @apply w-1/2 mx-auto mt-8 rounded-xl;
  &--disabled {
    @apply opacity-50 cursor-not-allowed bg-gray-500 hover:bg-gray-500;
  }
}

.banner-icon {
  @apply w-5 h-5;
}

.arrow-icon {
  @apply w-4 h-4 ml-auto;
}
</style>

<i18n lang="yaml">
zh:
  noContent: "暂无内容"
  visitLink: "访问链接"
  notFound:
    title: "找不到该项目"
    description: "抱歉，我们无法找到您要查看的项目"
    suggestions: "您可以尝试以下方法："
    checkUrl: "检查项目链接是否正确"
    checkLanguage: "检查是否有该语言版本的内容"
    tryOtherProjects: "浏览其他项目"
    backToProjects: "返回项目列表"
  ai:
    askAboutProject: "想了解更多？点击向 AI 提问关于这个项目的细节！"
    askAboutProjectDisabled: "该项目暂时无法进行 ai 详细提问"
en:
  noContent: "No content found."
  visitLink: "Visit Link"
  notFound:
    title: "Project Not Found"
    description: "Sorry, we couldn't find the project you're looking for"
    suggestions: "You might want to try:"
    checkUrl: "Check if the project URL is correct"
    checkLanguage: "Check if content is available in this language"
    tryOtherProjects: "Browse other projects"
    backToProjects: "Back to Projects"
  ai:
    askAboutProject: "Want to know more? Click to ask AI about this project!"
    askAboutProjectDisabled: "This project is temporarily unable to be asked about in detail"
ja:
  noContent: "コンテンツが見つかりません"
  notFound:
    title: "プロジェクトが見つかりません"
    description: "申し訳ありませんが、お探しのプロジェクトが見つかりませんでした"
    suggestions: "以下をお試しください："
    checkUrl: "プロジェクトのURLが正しいかどうかを確認する"
    checkLanguage: "この言語でコンテンツが利用可能かどうかを確認する"
    tryOtherProjects: "他のプロジェクトを閲覧する"
    backToProjects: "プロジェクト一覧に戻る"
  ai:
    askAboutProject: "詳しく知りたいですか？AIにこのプロジェクトについて質問してみましょう！"
ko:
  noContent: "콘텐츠를 찾을 수 없습니다"
  notFound:
    title: "프로젝트를 찾을 수 없습니다"
    description: "죄송합니다. 찾으시는 프로젝트를 찾을 수 없습니다"
    suggestions: "다음을 시도해 보세요:"
    checkUrl: "프로젝트 URL이 올바른지 확인"
    checkLanguage: "이 언어로 된 콘텐츠가 있는지 확인"
    tryOtherProjects: "다른 프로젝트 둘러보기"
    backToProjects: "프로젝트 목록으로 돌아가기"
  ai:
    askAboutProject: "더 알고 싶으신가요? AI에게 이 프로젝트에 대해 물어보세요!"
</i18n>