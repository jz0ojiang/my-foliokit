<template>
  <div
    class="flex items-center gap-4 px-6 py-3 rounded-lg text-base shadow-inner border search-box transition-all"
  >
    <Icon name="material-symbols:lightbulb-2-outline-rounded" class="lightbulb-icon" />
    <div class="search-input-container">
      <input
        v-model="query"
        type="text"
        class="search-input"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
        @search="handleSearch"
        enter-key-hint="search"
      />
      <div class="placeholder-container" v-show="!hasFocus" :class="{ 'has-mask': needMask }">
        <div class="placeholder-text" :style="{ animationDuration: animationDuration }">
          {{ currentPlaceholder }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#imports'
import { computed, onMounted, ref, onUnmounted } from 'vue'

const query = defineModel<string>()
const { locale: lang, t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
const hasFocus = ref(false)
const textWidth = ref(0)
const containerWidth = ref(0)

const questions = [
  t('question.0'),
  t('question.1'),
  t('question.2'),
  t('question.3'),
  t('question.4')
]

// 获取随机问题
const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length)
  return questions[randomIndex]
}

// 当前占位符
const currentPlaceholder = computed(() => {
  return t('placeholder', { placeholder: getRandomQuestion() })
})

// 计算动画时间
const animationDuration = computed(() => {
  if (textWidth.value <= containerWidth.value) return '0s'
  // 基础速度：每 100px 需要 2 秒
  const baseSpeed = 2 // 秒/100px
  const totalWidth = textWidth.value + containerWidth.value
  return `${(totalWidth / 100) * baseSpeed}s`
})

// 是否需要遮罩
const needMask = computed(() => {
  return textWidth.value > containerWidth.value
})

// 处理焦点事件
const handleFocus = () => {
  hasFocus.value = true
  emit('focus')
}

const handleBlur = () => {
  hasFocus.value = false
  emit('blur')
}

// 更新尺寸
const updateDimensions = () => {
  const container = document.querySelector('.placeholder-container')
  const text = document.querySelector('.placeholder-text')
  if (container && text) {
    containerWidth.value = container.clientWidth
    textWidth.value = text.scrollWidth
  }
}

// 处理搜索
const handleSearch = async () => {
  if (query.value) {
    emit('search', query.value)
    if(query.value.startsWith("#")) {
      const tag = query.value.slice(1)
      const path = localePath(`/tags/${tag}`)
      navigateTo(path)
      return
    }
    if(query.value.startsWith("/")) {
      const searchPath = query.value.split('/').slice(1).join('/')
      const encodedPath = encodeURIComponent(searchPath)
      const path = localePath(`/search?q=${encodedPath}`)
      navigateTo(path)
      return
    }
    const path = localePath('/ask?q=' + query.value)
    navigateTo(path)
    return
  }
  // 空搜索直接跳转至 ask
  const path = localePath('/ask')
  navigateTo(path)
}

const emit = defineEmits(['focus', 'blur', 'search'])

// 生命周期钩子
onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions)
  // 每 10 秒切换一次问题
  setInterval(() => {
    // 触发重新计算
    currentPlaceholder.value
    // 更新尺寸
    updateDimensions()
  }, 10000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<style lang="postcss" scoped>
.search-box {
  @apply flex items-center gap-4 px-6 py-3 rounded-full text-base shadow-inner border w-1/5;
  background-color: var(--color-surface-muted);
  border-color: var(--color-surface-card);
  position: relative;
}

.search-box:focus-within {
  border-color: var(--color-primary);
}

.lightbulb-icon {
  @apply w-5 h-5 shrink-0;
  color: var(--color-icon-muted);
}

.search-input-container {
  @apply relative flex-1;
}

.search-input {
  @apply bg-transparent outline-none w-full;
  color: var(--color-text-primary);
  caret-color: var(--color-accent);
}

.placeholder-container {
  @apply absolute inset-0 pointer-events-none overflow-hidden;
}

.placeholder-container.has-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
}

.placeholder-text {
  @apply text-gray-500 dark:text-gray-400 whitespace-nowrap;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  animation: scrollText linear infinite;
}

@keyframes scrollText {
  0% {
    transform: translateY(-50%) translateX(100%);
  }
  100% {
    transform: translateY(-50%) translateX(-100%);
  }
}

/* 搜索结果样式 */
.search-results {
  @apply absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50;
  max-height: 300px;
  overflow-y: auto;
}

.search-result-item {
  @apply p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
}

.result-link {
  @apply block;
}

.result-title {
  @apply text-base font-medium mb-1;
  color: var(--color-text-primary);
}

.result-tags {
  @apply flex flex-wrap gap-1;
}

.tag {
  @apply text-xs px-2 py-1 rounded;
  background-color: var(--color-surface-card);
  color: var(--color-text-secondary);
}
</style>

<i18n lang="yaml">
  zh:
    placeholder: "你可以问我: {placeholder}"
    question:
      - 有哪些项目是前端项目？
      - 有哪些项目是Vue项目？
      - 有哪些项目是全栈项目？
      - 有哪些项目是后端项目？
      - 向我介绍 FolioKit
  en:
    placeholder: "You can ask me: {placeholder}"
    question:
      - What are the projects that are front-end projects?
      - What are the projects that are Vue projects?
      - What are the projects that are full-stack projects?
      - What are the projects that are back-end projects?
      - Introduce FolioKit to me.
</i18n>