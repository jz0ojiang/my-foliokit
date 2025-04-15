<template>
  <div class="page-container">
    <MainContainer />
    <div class="content-section" :class="{ 'min-h-[100vh]': showMore, 'min-h-[80vh]': !showMore }">
      <div class="projects-container">
        <h2 class="section-title">{{ t('portfolio') }}</h2>
        <div class="projects-grid">
          <CommonProjectCard 
            v-for="project in projects" 
            :key="project.id"
            :title="project.title"
            :cover="project.cover || '/images/placeholder.jpg'"
            :time="project.date"
            :end-time="project.endDate || 'present'"
            :tags="project.tags"
            :is-top="project.top"
            :abbrlink="project.abbrlink"
          />
        </div>
      </div>
      <div class="load-more-container" v-if="showMore">
        <span class="block w-[6rem] h-[.5rem] rounded-full"></span>
        <button class="load-more-button" @click="loadMore">
          {{ loadMoreText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { useI18n } from 'vue-i18n'
import MainContainer from '@/components/MainContainer.vue'
import { getProjects } from '@/utils/getProjects'
import { ref, computed, onMounted } from 'vue'
import type { Project } from '@/types/project'

const localePath = useLocalePath();
const showMore = ref(false)
const start = ref(0)
const projects = ref<Project[]>([])

const { t, locale } = useI18n({
  useScope: 'local'
})

const loadMoreText = computed(() => {
  return start.value > 11 ? t('jumpToProjects') : t('loadMore')
})

const loadMore = async () => {
  if (start.value > 11) {
    navigateTo(localePath('/projects'))
    return
  }
  
  const newProjects = await getProjects(locale.value, start.value, 6)
  if (newProjects.length >= (projects.value.length - start.value)) {
    showMore.value = false
  }
  projects.value = [...projects.value, ...newProjects]
  if (newProjects.length > 5) {
    start.value += 6
  }
}

onMounted(async () => {
  const initialProjects = await getProjects(locale.value, 0, 6)
  if (initialProjects.length > 0) {
    projects.value = initialProjects
    if (initialProjects.length > 5) {
      showMore.value = true
      start.value += 6
    }
  }
})
</script>

<style lang="postcss" scoped>
.page-container {
  @apply flex flex-col w-full min-h-screen;
}

.content-section {
  @apply mb-8;
  height: auto;
  margin-top: 100vh;
  padding: 2rem;
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.section-title {
  @apply text-3xl font-bold mb-8;
  color: var(--color-text-primary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.load-more-container {
  @apply flex flex-col justify-center items-center mt-8 gap-2;
  span {
    background-color: var(--color-surface-card);
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--color-info) 50%,
        transparent 100%
      );
      transform: translateX(-100%);
    }
  }
  .load-more-button {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  &:has(.load-more-button:hover) {
    .load-more-button {
      color: var(--color-link);
    }
    span::after {
      animation: shine 2s infinite;
    }
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

:root {
  overflow: hidden;
}

body {
  overflow: hidden;
}

</style>

<i18n lang="yaml">
  en:
    portfolio: "Projects"
    loadMore: "Load More"
    jumpToProjects: "Jump to Projects"
  zh:
    portfolio: "作品集"
    loadMore: "加载更多"
    jumpToProjects: "查看全部项目"
</i18n>