import { useLangStore } from '@/stores/lang'
import { useI18n } from 'vue-i18n'

type LangCode = 'zh' | 'en'

// 从路径中提取语言代码
const getLangFromPath = (path: string): LangCode => {
  const match = path.match(/^\/([a-z]{2})(\/|$)/)
  return (match && (match[1] === 'zh' || match[1] === 'en')) ? match[1] as LangCode : 'zh'
}

// 获取系统语言
const getSystemLanguage = (): LangCode => {
  if (typeof window === 'undefined') return 'zh'
  
  const systemLang = navigator.language.toLowerCase()
  return systemLang.startsWith('zh') ? 'zh' : 'en'
}

export default defineNuxtRouteMiddleware((to) => {
  const { locale } = useI18n()
  const { lang, defaultLocale, setLang, userChangeLang } = useLangStore()

  // 获取 URL 中的语言
  const urlLang = getLangFromPath(to.path)
  
  // 检查用户语言设置
  if (userChangeLang) {
    // 用户手动切换过语言，使用用户设置
    locale.value = lang
    // 检查 URL 前缀是否需要调整
    if (lang !== urlLang) {
      if (lang === defaultLocale) {
        // 默认语言：移除语言前缀
        if (urlLang !== defaultLocale) {
          return navigateTo(to.path.replace(`/${urlLang}`, ''))
        }
      } else {
        // 非默认语言：添加语言前缀
        if (!to.path.startsWith(`/${lang}`)) {
          return navigateTo(`/${lang}${to.path}`)
        }
      }
    }
  } else {
    // 用户未手动切换语言：优先使用 URL 中的语言，如果没有则使用系统语言
    const preferredLang = urlLang !== defaultLocale ? urlLang : getSystemLanguage()
    locale.value = preferredLang
    setLang(preferredLang, false)
    
    // 如果系统语言与 URL 不匹配，重定向到正确的语言路径
    if (preferredLang !== urlLang) {
      if (preferredLang === defaultLocale) {
        return navigateTo(to.path.replace(`/${urlLang}`, ''))
      } else {
        return navigateTo(`/${preferredLang}${to.path}`)
      }
    }
  }
})
