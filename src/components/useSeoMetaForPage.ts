import { useI18n, useLocaleHead, useRoute, useHead } from '#imports'

interface SeoOverrides {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

export function useSeoMetaForPage(pageKey?: string, override: SeoOverrides = {}) {
  const route = useRoute()
  const { t } = useI18n({ useScope: 'global' })
  const head = useLocaleHead()

  const key = pageKey ?? route.name?.toString().split('-')[0] ?? 'index'

  const displayName = t('meta.global.displayName')
  const suffix = t('meta.global.suffix')

  const pageTitle = override.title ?? t(`meta.page.${key}.title`)
  const description = override.description ?? t(`meta.page.${key}.description`)
  const ogTitle = override.ogTitle ?? t(`meta.page.${key}.ogTitle`, t('meta.global.ogTitle'))
  const ogDescription = override.ogDescription ?? t(`meta.page.${key}.ogDescription`, t('meta.global.ogDescription'))
  const ogImage = override.ogImage ?? t('meta.global.ogImage')

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
