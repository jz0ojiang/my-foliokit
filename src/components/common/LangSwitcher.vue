<template>
  <div class="lang-switcher-container">
    <button
      class="lang-switcher-button"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
    >
      <Icon name="ph:globe" class="globe-icon" />
      <span class="text-base">{{ currentLanguageLabel }}</span>
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="language-dropdown" 
        :class="popupTop ? 'language-dropdown--top' : 'language-dropdown--bottom'"
        :style="{ '--translate-y': popupTop ? '-4px' : '4px' }"
        ref="dropdown"
      >
        <ul role="listbox">
          <li
            v-for="lang in availableLanguages"
            :key="lang.code"
            role="option"
            :aria-selected="lang.code === currentLang"
            @click="handleLanguageSwitch(lang.code)"
            class="language-option"
            :class="{ 'bg-white/5 font-medium language-option__active': lang.code === currentLang }"
          >
            {{ lang.name }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { navigateTo } from '#app';
import { updateSeoMetaWithLocale } from '~/components/useSeoMetaForPage';

const { locale } = useI18n();
const route = useRoute();

const availableLanguages = [
  { code: 'zh' as const, name: '简体中文' },
  { code: 'en' as const, name: 'English' },
];

const currentLang = computed(() => locale.value);

const currentLanguageLabel = computed(() => {
  return availableLanguages.find(l => l.code === currentLang.value)?.name || '中文';
});

const isOpen = ref(false);
const dropdown = ref<HTMLElement | null>(null);

const props = defineProps({
  popupTop: {
    type: Boolean,
    default: false
  }
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleLanguageSwitch = async (newLang: 'zh' | 'en') => {
  if (newLang === currentLang.value) return;
  
  // 更新语言
  locale.value = newLang;
  
  // 获取当前 path 和 query
  const currentPath = route.path;
  const currentQuery = route.query;
  const defaultLocale = 'zh';
  
  let newPath: string;
  if (newLang === defaultLocale) {
    // 切换到默认语言，移除前缀
    newPath = currentPath.replace(/^\/[a-z]{2}/, '') || '/';
  } else {
    // 切换到非默认语言，添加前缀
    newPath = currentPath.startsWith('/')
      ? `/${newLang}${currentPath}`
      : `/${newLang}/${currentPath}`;
  }
  
  // 跳转时带上 query
  await navigateTo({ path: newPath, query: currentQuery });
  
  // 先关闭下拉菜单
  isOpen.value = false;
  
  // 等待路由切换完成后再更新 SEO 元数据
  await updateSeoMetaWithLocale({locale: newLang});
};

// 点击外部关闭下拉菜单
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.lang-switcher-container')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="postcss" scoped>
.lang-switcher-container {
  @apply relative;
}

.lang-switcher-button {
  @apply flex items-center bg-transparent border-none text-white py-2 px-3 cursor-pointer gap-2 text-base rounded transition-colors;
}

.lang-switcher-button:hover {
  @apply bg-white/10;
}

.globe-icon {
  @apply w-6 h-6;
}

.language-dropdown {
  @apply absolute min-w-[140px] bg-gray-900 rounded shadow-lg z-50;
}

.language-dropdown--bottom {
  top: 100%;
  margin-top: 4px;
  right: 0;
  &.fade-enter-from,
  &.fade-leave-to {
    transform: translateY(-8px);
    opacity: 0;
  }
}

.language-dropdown--top {
  bottom: 100%;
  margin-bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  &.fade-enter-from,
  &.fade-leave-to {
    transform: translate(-50%, 8px);
    opacity: 0;
  }
}

.language-option {
  @apply py-3 px-4 cursor-pointer transition-colors text-white text-base;
}

.language-option:hover {
  @apply bg-white/10;
}

.language-option__active {
  @apply bg-white/5 font-medium;
  cursor: not-allowed;
}

/* 下拉菜单动画 */
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>