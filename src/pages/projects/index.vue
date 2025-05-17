<template>
  <div class="projects-demo-container">
    <h1>{{ t('language') }}{{ t('projects.title') }}</h1>
    <div class="projects-grid">
      <ProjectCard v-for="project in projectsData" :key="project.title" :title="project.title"
        :cover="project.cover || ''" :time="project.date" :endTime="project.endDate" :tags="project.tags"
        :isTop="project.top || false" :abbrlink="project.abbrlink" />
    </div>
  </div>
</template>

<script async setup lang="ts">
import ProjectCard from '@/components/common/ProjectCard.vue';
import { useI18n } from 'vue-i18n';
import { useSeoMetaForPage } from '~/components/useSeoMetaForPage';
import { getProjects } from '~/utils/getProjects';

const { locale: lang, t } = useI18n({ useScope: 'local' });
const projectsData = await getProjects(lang.value, 0, -1)

useSeoMetaForPage({pageKey: 'projects'})
</script>

<style lang="postcss" scoped>
.projects-demo-container {
  @apply max-w-6xl mx-auto py-10 px-4;
  min-height: 100vh;
  background-color: var(--color-surface-default);
}

h1 {
  @apply text-3xl font-bold mb-8;
  color: var(--color-text-primary);
}

.projects-grid {
  @apply grid gap-6 mb-16;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>

<i18n lang="yaml">
  en:
    language: "English "
    projects:
      title: "Projects List"
  zh:
    language: "中文"
    projects:
      title: "项目列表"
</i18n>
