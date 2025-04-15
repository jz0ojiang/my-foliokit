<template>
  <div class="main-container" :class="{ 'overflow-hidden': isLoading, 'animation-completed': hasAnimationCompleted }"
    @click="handleSkipAnimation">
    <AnimateNihao v-if="currentLang === 'zh'" class="svg-animate" @animationComplete="handleAnimationComplete"
      @animationStart="handleAnimationStarted" @click="handleSvgClick" ref="animateRef" />
    <AnimateHello v-else class="svg-animate" @animationComplete="handleAnimationComplete"
      @animationStart="handleAnimationStarted" @click="handleSvgClick" ref="animateRef" />
    <SearchBox class="search-box" id="search-input" @focus="handleFocus" @blur="handleBlur" />
    <CommonTooltip v-model="showTooltip" target="#search-input" placement="top" :offset="[0, 25]">
      <div class="tooltip-content">
        <p>{{ t('searchTooltipTitle') }}</p>
        <p>{{ t('naturalLanguageExample') }}</p>
        <p>/maimai {{ t('keywordSearch') }}</p>
        <p>#Vue {{ t('tagSearch') }}</p>
        <p>{{ t('emptySearch') }}</p>
      </div>
    </CommonTooltip>
    <div v-if="showMask" class="loading-mask" :class="{ 'loading-mask--hidden': !isLoading }" />
    <div class="emoji-hint">
      <span>{{ t('exploreHint') }}
        👇 |
        🤔
        <NuxtLink :to="localePath('/about')">{{ t('aboutMe') }}</NuxtLink>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimateNihao from '@/components/stroke-animates/nihao.vue'
import AnimateHello from '@/components/stroke-animates/hello.vue'
import SearchBox from '@/components/ai/SearchBox.vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import { useNuxtApp } from '#app'
import { useLocalePath } from '#i18n'
const localePath = useLocalePath();

const { t, locale } = useI18n({
  useScope: 'local'
})

const { $loadFullFont } = useNuxtApp()
const currentLang = computed(() => locale.value)
const isLoading = ref(true)
const hasAnimationCompleted = ref(false)
const showTooltip = ref(false)
const showMask = ref(true)
const animateRef = ref(null)
const hasAnimationStarted = ref(false)

// 初始化页面状态
const initPageState = () => {
  document.documentElement.classList.remove('enable-scroll')
  document.body.classList.remove('enable-scroll')
  document.documentElement.classList.add('visually-hidden')
}

// 显示页面内容
const showPageContent = () => {
  document.documentElement.classList.remove('visually-hidden')
  document.documentElement.classList.add('visually-visible')
}

const handleFocus = () => {
  showTooltip.value = true
}

const handleBlur = () => {
  showTooltip.value = false
}

const handleAnimationEnd = () => {
  isLoading.value = false
  // @ts-ignore
  $loadFullFont()
  document.documentElement.classList.add('enable-scroll')
  document.body.classList.add('enable-scroll')
  setTimeout(() => {
    showMask.value = false
  }, 1000)
}

let animationTimeoutId: number | null = null

const resetAnimationTimeout = () => {
  if (animationTimeoutId !== null) {
    clearTimeout(animationTimeoutId)
  }
  animationTimeoutId = window.setTimeout(() => {
    if (isLoading.value) {
      console.log('动画超时，自动完成')
      handleAnimationEnd()
    }
  }, 10000)
}

const handleAnimationStarted = () => {
  if (!hasAnimationStarted.value) {
    console.log('动画开始')
    hasAnimationStarted.value = true
    resetAnimationTimeout()
    showPageContent() // 动画开始时显示页面内容
  }
}

const handleAnimationComplete = () => {
  if (!hasAnimationCompleted.value) {
    console.log('动画完成')
    hasAnimationCompleted.value = true
    handleAnimationEnd()
  }
}

const handleSkipAnimation = (event: MouseEvent) => {
  if (isLoading.value) {
    hasAnimationCompleted.value = true
    handleAnimationEnd()
  }
}

const handleSvgClick = (event: MouseEvent) => {
  event.stopPropagation()
  event.preventDefault()
}

onMounted(() => {
  initPageState()
  const isFirstVisit = !sessionStorage.getItem('app_visited')

  if (!isFirstVisit) {
    isLoading.value = false
    showMask.value = false
    hasAnimationCompleted.value = true
    showPageContent()
  } else {
    resetAnimationTimeout()
    nextTick(() => {
      if (animateRef.value) {
        handleAnimationStarted()
      }
    })
  }
})

watch(isLoading, (newValue) => {
  if (newValue) {
    document.documentElement.classList.remove('enable-scroll')
    document.body.classList.remove('enable-scroll')
  } else {
    document.documentElement.classList.add('enable-scroll')
    document.body.classList.add('enable-scroll')
  }
})

onUnmounted(() => {
  if (animationTimeoutId !== null) {
    clearTimeout(animationTimeoutId)
  }
})
</script>

<style lang="postcss" scoped>
.main-container {
  @apply flex flex-col items-center w-full;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  padding-bottom: 10vh;
}

.main-container.animation-completed {
  pointer-events: none;

  .search-box,
  .emoji-hint,
  .svg-animate {
    pointer-events: auto;
  }
}

.svg-animate {
  width: 12rem;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  margin: auto 0;
}

.search-box {
  @apply min-w-[350px];
  margin-top: auto;
}

.loading-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-surface-default);
  opacity: 0.9;
  transition: all .9s ease;
  z-index: 40;
}

.loading-mask--hidden {
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

.overflow-hidden {
  overflow: hidden;
}

.emoji-hint {
  @apply flex items-center justify-center;
  white-space: nowrap;
  margin-top: 1rem;
}

.emoji-hint :deep(img) {
  display: inline-block;
  vertical-align: middle;
  margin: 0;
}

.emoji-hint :deep(span) {
  display: inline-block;
  vertical-align: middle;
}

.emoji-hint :deep(a) {
  color: var(--color-link);
  transition: color .3s ease;
}

.emoji-hint :deep(a:hover) {
  color: var(--color-accent);
}

.tooltip-content {
  @apply text-sm;
  line-height: 1.5;

  p {
    @apply my-1;
  }

  p:first-child {
    @apply font-medium mb-2;
  }
}
</style>

<i18n lang="yaml">
  en:
    exploreHint: "Explore my portfolio"
    aboutMe: "About me?"
    searchTooltipTitle: "Supports natural language questions, keyword search, and tag filtering:"
    naturalLanguageExample: '"What frontend projects do you have?"'
    keywordSearch: "Search content"
    tagSearch: "View tagged projects"
    emptySearch: "Leave empty to go to chat page"
  zh:
    exploreHint: "探索我的作品集"
    aboutMe: "关于我？"
    searchTooltipTitle: "支持自然语言提问、关键词搜索和标签筛选："
    naturalLanguageExample: '"有哪些前端项目？"'
    keywordSearch: "搜索内容"
    tagSearch: "查看标签项目"
    emptySearch: "留空进入聊天页面"
</i18n>