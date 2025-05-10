<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/lang'
import { watch } from 'vue'

const { locale } = useI18n()
const langStore = useLangStore()

// 监听 Vue I18n 的 locale 变化，同步到 Pinia store
watch(locale, (newLang) => {
  if (newLang !== langStore.lang) {
    langStore.setLang(newLang as 'zh' | 'en')
  }
})

// 初始化时同步状态
const savedLang = localStorage.getItem('lang') as 'zh' | 'en' | null
if (savedLang && savedLang !== locale.value) {
  locale.value = savedLang
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

/* 优化初始加载体验 */
html.visually-hidden {
  opacity: 0;
}
</style>