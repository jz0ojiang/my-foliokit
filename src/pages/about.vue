<template>
  <div class="about">
    <div class="intro">
      <h1 class="title">
        <div class="flex items-center gap-2">
          <StrokeAnimatesNihao v-if="locale === 'zh'" class="greeting" />
          <StrokeAnimatesHello v-else class="greeting__en" />
          <span class="name">{{ t('name') }}</span>
          <span class="paw">🐾</span>
        </div>
      </h1>
      <p class="description">{{ t('description1') }}</p>
      <p class="description">{{ t('description2') }}</p>
    </div>

    <div class="section">
      <div class="section-header">
        <Icon name="mdi:tools" class="section-icon" />
        <h2 class="section-title">{{ t('workingOnTitle') }}</h2>
      </div>
      <p>{{ t('currentlyBuilding') }} <NuxtLink to="https://github.com/FolioKit/FolioKit" class="link">FolioKit</NuxtLink>:</p>
      <p class="description">{{ t('projectDescription1') }}</p>
      <p class="description">{{ t('projectDescription2') }}</p>
    </div>

    <div class="section">
      <div class="section-header">
        <Icon name="mdi:star" class="section-icon" />
        <h2 class="section-title">{{ t('aboutSiteTitle') }}</h2>
      </div>
      <p>{{ t('siteDescription1') }} <NuxtLink to="https://github.com/FolioKit/FolioKit" class="link">FolioKit</NuxtLink>.</p>
      <p class="description">{{ t('siteDescription2') }}</p>
      <p class="description">{{ t('siteDescription3') }}</p>
    </div>

    <div class="section">
      <div class="section-header">
        <Icon name="mdi:card-account-details" class="section-icon" />
        <h2 class="section-title">{{ t('contactTitle') }}</h2>
      </div>
      <p>GitHub: <NuxtLink to="https://github.com/jz0ojiang" class="link">@jz0ojiang</NuxtLink></p>
      <p>Email: <NuxtLink to="mailto:hi@im0o.top" class="link">hi@im0o.top</NuxtLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({
  useScope: 'local'
})
</script>

<style lang="postcss" scoped>
.about {
    @apply max-w-3xl mx-auto px-4 py-8 space-y-12 mb-12;
    font-family: 'LXGW Wenkai', sans-serif;
}

.intro {
  @apply space-y-4;
}

.title {
  @apply text-4xl md:text-5xl font-bold flex flex-col items-start gap-4;
}

.greeting {
  @apply w-36 p-2 mr-[-1rem];
}

.greeting__en {
  @apply w-40 mr-[-2rem] mb-[-1rem];
}

.name {
  font-family: 'LXGW Wenkai', sans-serif;
}

.paw {
  @apply animate-bounce;
}

.description {
  @apply text-lg;
  color: var(--color-text-secondary);
}

.section {
  @apply space-y-4;
}

.section-header {
  @apply flex items-center gap-2 mb-4;
}

.section-icon {
  @apply text-2xl animate-pulse;
  color: var(--color-accent);
}

.section-title {
  @apply text-2xl font-bold;
}

.link {
  color: var(--color-link);
  @apply transition-colors duration-200;
  
  &:hover {
    color: var(--color-accent);
  }
}
</style>

<i18n lang="yaml">
zh:
  name: "，我是 Oo酱"
  description1: "一个喜欢把技术和美感探在一起的开发者。"
  description2: "专注 Web 前端/全栈开发，热衷于做「简洁而不简单」的产品。"
  workingOnTitle: "最近在做什么？"
  currentlyBuilding: "当前正在开发一个开源项目"
  projectDescription1: "一个支持中英文、AI 问答、极简主题的作品集模板。"
  projectDescription2: "它以 Markdown 为内容源，以 Nuxt3 构建前后端，并尝试用语义交互替代传统 UI。目标是做一个「轻便但不轻率」的作品集系统。"
  aboutSiteTitle: "关于这个作品集站点"
  siteDescription1: "这个站就是用我的项目"
  siteDescription2: "每个项目都是真实做过的内容，详情页是我自己写的介绍。"
  siteDescription3: "你可以用自然语言提问「有哪些前端项目？」「有哪些全栈项目？」，试试看主页下方的 AI 对话框吧！"
  contactTitle: "联系方式"
en:
  name: ", I'm Jason Ji"
  description1: "A developer who enjoys blending technology with clean aesthetics."
  description2: "Focused on frontend & fullstack development, with a preference for minimal and semantic design."
  workingOnTitle: "What am I working on?"
  currentlyBuilding: "I'm currently building"
  projectDescription1: "an open-source portfolio template with bilingual support, AI chat, and elegant minimalism."
  projectDescription2: "My goal is to create a \"lightweight, but not light-minded\" personal site experience."
  aboutSiteTitle: "About this site"
  siteDescription1: "This website is powered by"
  siteDescription2: "All the projects here are real, and each detail page is manually written."
  siteDescription3: "You can ask questions like \"Which ones are frontend?\" or \"Show me a fullstack project\" below — Give it a try!"
  contactTitle: "Contact"
</i18n>