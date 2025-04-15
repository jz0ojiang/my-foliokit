<template>
  <div class="tags-container">
    <h1 class="page-title">{{ t('taggedProjects', { tag }) }}</h1>
    <div class="projects-grid">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id" 
        :title="project.title" 
        :cover="project.cover" 
        :time="project.date" 
        :end-time="project.endDate" 
        :tags="project.tags" 
        :is-top="project.top"
        :abbrlink="project.abbrlink"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/common/ProjectCard.vue';
import { getProjectsByTag } from '@/utils/getProjects';
import { useI18n } from 'vue-i18n';

const { locale: lang, t } = useI18n()
const { tag } = useRoute().params
const projects = await getProjectsByTag(lang.value, tag as string)
</script>

<style lang="postcss" scoped>
.tags-container {
  @apply max-w-6xl mx-auto py-10 px-4;
  min-height: 100vh;
  background-color: var(--color-surface-default);
}

.page-title {
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
  tag: "Tag"
  taggedProjects: "Projects tagged with '{tag}'"
zh:
  tag: "标签"
  taggedProjects: "标签包含 '{tag}' 的项目"
</i18n>