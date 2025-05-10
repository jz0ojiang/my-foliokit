<template>
  <span 
    class="tag"
    :class="getTagClass(tag)"
    :style="getCustomStyle(tag)"
    @click="handleClick"
  >
    {{ getTagText(tag) }}
  </span>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'

const props = defineProps<{
  tag: string
}>()

const localePath = useLocalePath()

// 判断颜色是否为深色
const isDarkColor = (hexColor: string) => {
  // 移除 # 号
  const color = hexColor.replace('#', '');
  // 转换为 RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  // 计算亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

// 获取标签文本（去除颜色代码）
const getTagText = (tag: string) => {
  const parts = tag.split('#');
  return parts[0];
};

// 获取自定义样式
const getCustomStyle = (tag: string) => {
  const parts = tag.split('#');
  if (parts.length > 1 && /^[0-9A-Fa-f]{6}$/.test(parts[1])) {
    const color = `#${parts[1]}`;
    return {
      backgroundColor: color,
      color: isDarkColor(color) ? 'white' : 'black'
    };
  }
  return {};
};

// 获取标签的CSS类名
const getTagClass = (tag: string) => {
  const lowerTag = tag.toLowerCase();
  const tagText = getTagText(lowerTag);
  
  // 如果包含自定义颜色，返回空类名
  if (tag.includes('#')) {
    return '';
  }
  
  // 常见技术标签映射
  const techTags: Record<string, string> = {
    'html': 'tag-html',
    'css': 'tag-css',
    'js': 'tag-javascript',
    'javascript': 'tag-javascript',
    'ts': 'tag-typescript',
    'typescript': 'tag-typescript',
    'vue': 'tag-vue',
    'vuejs': 'tag-vue',
    'vue.js': 'tag-vue',
    'react': 'tag-react',
    'reactjs': 'tag-react',
    'react.js': 'tag-react',
    'angular': 'tag-angular',
    'nodejs': 'tag-nodejs',
    'node.js': 'tag-nodejs',
    'express': 'tag-express',
    'python': 'tag-python',
    'golang': 'tag-golang',
    'go': 'tag-golang',
    'java': 'tag-java',
    'cpp': 'tag-cpp',
    'c++': 'tag-cpp',
    'rust': 'tag-rust',
    'svelte': 'tag-svelte',
    'swift': 'tag-swift',
    'dart': 'tag-dart',
    'shell': 'tag-shell',
    'bash': 'tag-shell',
    'hexo': 'tag-hexo',
    'nuxt': 'tag-nuxt',
    'nuxtjs': 'tag-nuxt',
    'nuxt.js': 'tag-nuxt',
    'markdown': 'tag-markdown',
    'md': 'tag-markdown',
    'json': 'tag-json',
    'ai': 'tag-ai',
    'mentor': 'tag-mentor',
    'foliokit': 'tag-foliokit',
    'docker': 'tag-docker',
    'kubernetes': 'tag-kubernetes',
    'k8s': 'tag-kubernetes',
    'git': 'tag-git',
    'mongodb': 'tag-mongodb',
    'mysql': 'tag-mysql',
    'postgresql': 'tag-postgresql',
    'postgres': 'tag-postgresql',
    'redis': 'tag-redis',
    'nginx': 'tag-nginx',
    'jest': 'tag-jest',
    'webpack': 'tag-webpack',
    'vite': 'tag-vite',
    'tailwind': 'tag-tailwind',
    'tailwindcss': 'tag-tailwind',
    'bootstrap': 'tag-bootstrap',
    'jquery': 'tag-jquery',
    'aws': 'tag-aws',
    'azure': 'tag-azure',
    'gcp': 'tag-gcp',
    'google cloud': 'tag-gcp',
    'frontend': 'tag-frontend',
    '前端开发': 'tag-frontend',
    'webdev': 'tag-webdev',
    'web development': 'tag-webdev',
    'web开发': 'tag-webdev',
    'mobiledev': 'tag-mobiledev',
    'mobile development': 'tag-mobiledev',
    '移动开发': 'tag-mobiledev',
    'reactnative': 'tag-reactnative',
    'react native': 'tag-reactnative',
    'machinelearning': 'tag-machinelearning',
    'machine learning': 'tag-machinelearning',
    'ml': 'tag-machinelearning',
    '机器学习': 'tag-machinelearning',
    'nlp': 'tag-nlp',
    'natural language processing': 'tag-nlp',
    '自然语言处理': 'tag-nlp',
    'datascience': 'tag-datascience',
    'data science': 'tag-datascience',
    '数据分析': 'tag-datascience',
    'datavisualization': 'tag-datavisualization',
    'data visualization': 'tag-datavisualization',
    '数据可视化': 'tag-datavisualization',
    'backend': 'tag-backend',
    '后端开发': 'tag-backend',
    'fullstack': 'tag-fullstack',
    'full stack': 'tag-fullstack',
    '全栈开发': 'tag-fullstack',
    'devops': 'tag-devops',
    'cloud': 'tag-cloud',
    '云计算': 'tag-cloud',
    'iot': 'tag-iot',
    'internet of things': 'tag-iot',
    '物联网': 'tag-iot',
    'blockchain': 'tag-blockchain',
    '区块链': 'tag-blockchain',
    'gamedev': 'tag-gamedev',
    'game development': 'tag-gamedev',
    '游戏开发': 'tag-gamedev',
    'cybersecurity': 'tag-cybersecurity',
    'cyber security': 'tag-cybersecurity',
    '网络安全': 'tag-cybersecurity'
  };
  
  // 返回对应的标签类，如果没有匹配则返回默认类
  return techTags[tagText] || 'tag-empty';
};

// 处理标签点击
const handleClick = () => {
  const tagText = getTagText(props.tag);
  const path = localePath(`/tags/${tagText}`);
  navigateTo(path);
}
</script>

<style lang="postcss" scoped>
.tag {
  @apply px-2 py-1 text-xs rounded-md min-w-8 text-center cursor-pointer transition-all duration-200;
  background-color: var(--color-surface-card-inner);
  color: var(--color-text-primary);
  font-family: Poppins, 'LXGW WenKai', sans-serif;
  backdrop-filter: blur(6px);
}

.tag:hover {
  filter: brightness(0.8);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 标签颜色 - 继承自 tag.css 的变量 */
.tag-html {
  background-color: var(--tag-color-html) !important;
  color: white !important;
}
.tag-css {
  background-color: var(--tag-color-css) !important;
  color: white !important;
}
.tag-javascript {
  background-color: var(--tag-color-javascript) !important;
  color: black !important;
}
.tag-typescript {
  background-color: var(--tag-color-typescript) !important;
  color: white !important;
}
.tag-vue {
  background-color: var(--tag-color-vue) !important;
  color: white !important;
}
.tag-react {
  background-color: var(--tag-color-react) !important;
  color: black !important;
}
.tag-angular {
  background-color: var(--tag-color-angular) !important;
  color: white !important;
}
.tag-nodejs {
  background-color: var(--tag-color-nodejs) !important;
  color: white !important;
}
.tag-express {
  background-color: var(--tag-color-express) !important;
  color: white !important;
}
.tag-python {
  background-color: var(--tag-color-python) !important;
  color: white !important;
}
.tag-golang {
  background-color: var(--tag-color-golang) !important;
  color: white !important;
}
.tag-java {
  background-color: var(--tag-color-java) !important;
  color: white !important;
}
.tag-cpp {
  background-color: var(--tag-color-cpp) !important;
  color: white !important;
}
.tag-rust {
  background-color: var(--tag-color-rust) !important;
  color: black !important;
}
.tag-svelte {
  background-color: var(--tag-color-svelte) !important;
  color: white !important;
}
.tag-swift {
  background-color: var(--tag-color-swift) !important;
  color: white !important;
}
.tag-dart {
  background-color: var(--tag-color-dart) !important;
  color: white !important;
}
.tag-shell {
  background-color: var(--tag-color-shell) !important;
  color: black !important;
}
.tag-hexo {
  background-color: var(--tag-color-hexo) !important;
  color: white !important;
}
.tag-nuxt {
  background-color: var(--tag-color-nuxt) !important;
  color: black !important;
}
.tag-markdown {
  background-color: var(--tag-color-markdown) !important;
  color: white !important;
}
.tag-json {
  background-color: var(--tag-color-json) !important;
  color: white !important;
}
.tag-empty {
  background-color: var(--tag-color-empty) !important;
  color: white !important;
}
.tag-mentor {
  background-color: var(--tag-color-mentor) !important;
  color: white !important;
}
.tag-ai {
  background-color: var(--tag-color-ai) !important;
  color: white !important;
}
.tag-foliokit {
  background: var(--tag-color-foliokit) !important;
  color: white !important;
}
.tag-docker {
  background-color: var(--tag-color-docker) !important;
  color: white !important;
}
.tag-kubernetes {
  background-color: var(--tag-color-kubernetes) !important;
  color: white !important;
}
.tag-git {
  background-color: var(--tag-color-git) !important;
  color: white !important;
}
.tag-mongodb {
  background-color: var(--tag-color-mongodb) !important;
  color: white !important;
}
.tag-mysql {
  background-color: var(--tag-color-mysql) !important;
  color: white !important;
}
.tag-postgresql {
  background-color: var(--tag-color-postgresql) !important;
  color: white !important;
}
.tag-redis {
  background-color: var(--tag-color-redis) !important;
  color: white !important;
}
.tag-nginx {
  background-color: var(--tag-color-nginx) !important;
  color: white !important;
}
.tag-jest {
  background-color: var(--tag-color-jest) !important;
  color: white !important;
}
.tag-webpack {
  background-color: var(--tag-color-webpack) !important;
  color: black !important;
}
.tag-vite {
  background-color: var(--tag-color-vite) !important;
  color: white !important;
}
.tag-tailwind {
  background-color: var(--tag-color-tailwind) !important;
  color: white !important;
}
.tag-bootstrap {
  background-color: var(--tag-color-bootstrap) !important;
  color: white !important;
}
.tag-jquery {
  background-color: var(--tag-color-jquery) !important;
  color: white !important;
}
.tag-aws {
  background-color: var(--tag-color-aws) !important;
  color: white !important;
}
.tag-azure {
  background-color: var(--tag-color-azure) !important;
  color: white !important;
}
.tag-gcp {
  background-color: var(--tag-color-gcp) !important;
  color: white !important;
}
.tag-frontend {
  background-color: var(--tag-color-frontend) !important;
  color: black !important;
}
.tag-webdev {
  background-color: var(--tag-color-webdev) !important;
  color: white !important;
}
.tag-mobiledev {
  background-color: var(--tag-color-mobiledev) !important;
  color: white !important;
}
.tag-reactnative {
  background-color: var(--tag-color-reactnative) !important;
  color: black !important;
}
.tag-machinelearning {
  background-color: var(--tag-color-machinelearning) !important;
  color: white !important;
}
.tag-nlp {
  background-color: var(--tag-color-nlp) !important;
  color: white !important;
}
.tag-datascience {
  background-color: var(--tag-color-datascience) !important;
  color: white !important;
}
.tag-datavisualization {
  background-color: var(--tag-color-datavisualization) !important;
  color: white !important;
}
.tag-backend {
  background-color: var(--tag-color-backend) !important;
  color: white !important;
}
.tag-fullstack {
  background-color: var(--tag-color-fullstack) !important;
  color: white !important;
}
.tag-devops {
  background-color: var(--tag-color-devops) !important;
  color: white !important;
}
.tag-cloud {
  background-color: var(--tag-color-cloud) !important;
  color: white !important;
}
.tag-iot {
  background-color: var(--tag-color-iot) !important;
  color: black !important;
}
.tag-blockchain {
  background-color: var(--tag-color-blockchain) !important;
  color: white !important;
}
.tag-gamedev {
  background-color: var(--tag-color-gamedev) !important;
  color: white !important;
}
.tag-cybersecurity {
  background-color: var(--tag-color-cybersecurity) !important;
  color: white !important;
}

/* 通用标签样式 */
.tag-primary {
  background-color: var(--tag-color-primary) !important;
  color: white !important;
}
.tag-secondary {
  background-color: var(--tag-color-secondary) !important;
  color: white !important;
}
.tag-success {
  background-color: var(--tag-color-success) !important;
  color: white !important;
}
.tag-warning {
  background-color: var(--tag-color-warning) !important;
  color: black !important;
}
.tag-danger {
  background-color: var(--tag-color-danger) !important;
  color: white !important;
}
.tag-info {
  background-color: var(--tag-color-info) !important;
  color: white !important;
}
.tag-light {
  background-color: var(--tag-color-light) !important;
  color: black !important;
}
.tag-dark {
  background-color: var(--tag-color-dark) !important;
  color: white !important;
}

/* 灰度标签样式 */
.tag-gray-100 {
  background-color: var(--tag-color-gray-100) !important;
  color: black !important;
}
.tag-gray-200 {
  background-color: var(--tag-color-gray-200) !important;
  color: black !important;
}
.tag-gray-300 {
  background-color: var(--tag-color-gray-300) !important;
  color: black !important;
}
.tag-gray-400 {
  background-color: var(--tag-color-gray-400) !important;
  color: black !important;
}
.tag-gray-500 {
  background-color: var(--tag-color-gray-500) !important;
  color: white !important;
}
.tag-gray-600 {
  background-color: var(--tag-color-gray-600) !important;
  color: white !important;
}
.tag-gray-700 {
  background-color: var(--tag-color-gray-700) !important;
  color: white !important;
}
.tag-gray-800 {
  background-color: var(--tag-color-gray-800) !important;
  color: white !important;
}
.tag-gray-900 {
  background-color: var(--tag-color-gray-900) !important;
  color: white !important;
}
</style> 