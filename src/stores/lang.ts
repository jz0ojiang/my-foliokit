import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Language {
  code: 'zh' | 'en'
  name: string
}

export const useLangStore = defineStore('lang', () => {
  const lang = ref<'zh' | 'en'>('zh')
  const userChangeLang = ref(false)
  const defaultLocale = 'zh'
  
  const availableLanguages: Language[] = [
    { code: 'zh', name: '简体中文' },
    { code: 'en', name: 'English' }
  ]
  
  const currentLanguage = computed(() => {
    return availableLanguages.find(l => l.code === lang.value) || availableLanguages[0]
  })
  
  function setLang(newLang: 'zh' | 'en', isUserChange = false) {
    lang.value = newLang
    userChangeLang.value = isUserChange
  }
  
  return {
    lang,
    userChangeLang,
    defaultLocale,
    availableLanguages,
    currentLanguage,
    setLang
  }
})
