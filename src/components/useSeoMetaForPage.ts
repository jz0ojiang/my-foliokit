import { useNuxtApp, useLocaleHead, useRoute, useHead } from '#imports'

const route = useRoute()

interface SeoOverrides {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

export async function updateSeoMetaWithLocale({locale}: {locale: string}) {
  await useNuxtApp().$i18n.loadLocaleMessages(locale as 'zh' | 'en')
  await nextTick()
  useSeoMetaForPage()
}

export function useSeoMetaForPage({pageKey, override}: {pageKey?: string, override?: SeoOverrides} = {}) {
  const head = useLocaleHead()

  const key = pageKey ?? route.name?.toString().split('-')[0].split('__')[0] ?? 'index'

  const displayName = useNuxtApp().$i18n.t('meta.global.displayName')
  const suffix = useNuxtApp().$i18n.t('meta.global.suffix')

  const pageTitle = override?.title ?? useNuxtApp().$i18n.t(`meta.page.${key}.title`)
  const description = override?.description ?? useNuxtApp().$i18n.t(`meta.page.${key}.description`)
  const ogTitle = override?.ogTitle ?? useNuxtApp().$i18n.t(`meta.page.${key}.ogTitle`, useNuxtApp().$i18n.t('meta.global.ogTitle'))
  const ogDescription = override?.ogDescription ?? useNuxtApp().$i18n.t(`meta.page.${key}.ogDescription`, useNuxtApp().$i18n.t('meta.global.ogDescription'))
  const ogImage = override?.ogImage ?? useNuxtApp().$i18n.t('meta.global.ogImage')

  useHead({
    htmlAttrs: head.value.htmlAttrs,
    link: head.value.link ?? [],
    title: `${pageTitle} · ${displayName} ${suffix}`,
    meta: [
      ...(head.value.meta ?? []),
      { name: 'description', content: description },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      ...(ogImage ? [{ property: 'og:image', content: ogImage }] : [])
    ]
  })
}
