<template>
  <div class="project-card" :class="{ 'is-top': isTop }" @click="handleClick">
    <div class="project-card-inner">
      <!-- 使用懒加载原理，先显示占位图，然后在 src 中设置真实图片 -->
      <img 
        :src="defaultCover" 
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        ref="imageRef"
      />
      
      <div class="project-card-overlay"></div>
      <!-- TOP标识 -->
      <div v-if="isTop" class="project-top-tag">
        <span>{{ t('top') }}</span>
      </div>
      
      <!-- 卡片内容 -->
      <div class="project-content">
        <h3 class="project-title" :title="title">{{ title }}</h3>
        
        <div class="project-time">
          <span class="time-range">{{ formattedTimeRange }}</span>
        </div>
        
        <div class="project-tags">
          <Tag 
            v-for="(tag, index) in tags" 
            :key="index" 
            :tag="tag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultCover from '@/assets/images/default-cover.jpeg'
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '#i18n'
import Tag from './Tag.vue'

const { t, locale } = useI18n({
  useScope: 'local'
});

const localePath = useLocalePath();

interface ProjectCardProps {
  title: string;
  cover?: string;
  time?: string | Date;
  endTime?: string | Date | 'present';
  tags?: string[];
  isTop?: boolean;
  abbrlink?: string;
}

const props = withDefaults(defineProps<ProjectCardProps>(), {
  title: '',
  cover: '',
  time: '',
  endTime: '',
  tags: () => [],
  isTop: false,
  abbrlink: ''
});

// 图片引用
const imageRef = ref<HTMLImageElement | null>(null);

// 在组件挂载后懒加载图片
onMounted(() => {
  if (!props.cover || !imageRef.value) return;
  
  // 预加载图片
  const img = new Image();
  img.onload = () => {
    // 当图片加载完成后，将真实图片地址设置到图片元素
    if (imageRef.value) {
      imageRef.value.src = props.cover;
    }
  };
  
  // 设置图片源，开始加载
  img.src = props.cover;
});

const handleClick = () => {
  // 优先使用 abbrlink 作为路由
  if (props.abbrlink) {
    const path = `/projects/${props.abbrlink}`;
    console.log('Navigation with abbrlink:', {
      abbrlink: props.abbrlink,
      finalPath: path
    });
    navigateTo(path);
    return;
  }
  
  // 如果没有 abbrlink，则使用标题
  const slug = encodeURIComponent(props.title);
  const path = `/projects/${slug}`;
  
  console.log('Navigation with title:', {
    slug,
    title: props.title,
    finalPath: path
  });
  
  navigateTo(path);
}

// 格式化时间范围
const formattedTimeRange = computed(() => {
  if (!props.time) return '';
  
  let startTime = '';
  let endTime = '';
  
  if (props.time === props.endTime) {
    return props.time;
  }

  // 处理开始时间
  startTime = new Date(props.time).toLocaleDateString(locale.value, { year: 'numeric', month: '2-digit', day: '2-digit' });
  
  // 处理结束时间
  if (!props.endTime) {
    return startTime;
  } else if (props.endTime === 'present') {
    endTime = t('present');
  } else if (props.endTime instanceof Date) {
    endTime = props.endTime.toLocaleDateString(locale.value, { year: 'numeric', month: '2-digit', day: '2-digit' });
  } else {
    endTime = props.endTime;
  }

  return `${startTime} - ${endTime}`;
});
</script>

<i18n lang="yaml">
zh:
  top: "TOP"
  present: "至今"
en:
  top: "TOP"
  present: "Present"
</i18n>

<style lang="postcss" scoped>
.project-card {
  @apply relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl;
  background-color: var(--color-surface-card);
  height: 200px;
  width: 100%;
}

.project-card.is-top {
  @apply ring-2;
  --tw-ring-color: var(--color-accent);
}

.project-card-inner {
  @apply relative h-full w-full bg-cover bg-center;
}

.project-card-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/80 to-black/20;
}

.project-content {
  @apply absolute bottom-0 left-0 w-full p-4 z-10;
}

.project-title {
  @apply text-xl font-bold mb-2 text-white truncate;
}

.project-time {
  @apply text-sm mb-2 opacity-80;
}

.time-range {
  @apply inline-block;
  color: var(--color-text-tertiary);
}

.project-tags {
  @apply flex flex-wrap gap-2;
}

.project-top-tag {
  @apply absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold z-10;
  background-color: rgba(1, 145, 255, 0.7);
  color: white;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.placeholder-image {
  @apply transition-opacity duration-300;
}

.actual-image {
  @apply transition-opacity duration-500;
  opacity: 1;
}

.actual-image.opacity-0 {
  opacity: 0;
}
</style> 