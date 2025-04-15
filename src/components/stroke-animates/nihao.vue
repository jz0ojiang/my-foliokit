<template>
  <div class="stroke-writer">
    <svg viewBox="0 0 136.012 56.4916" xmlns="http://www.w3.org/2000/svg">
      <!-- 笔画 1 -->
      <path d="M21 2.5C18.67 8.5 11.6 22.6 2 31"></path>
      <!-- 笔画 2 -->
      <path d="M13.5 18.5L13.5 52"></path>
      <!-- 笔画 3 -->
      <path d="M33.5 2C33.22 3.7 33.34 7.9 31 13.5C29.22 17.77 29.5 16 22 21C12.52 27.32 58 -4 51.5 20"></path>
      <!-- 笔画 4 -->
      <path d="M39 16.5C39 16.5 44 48 38.5 53.5C33 59 15 38.5 27 31.5C39 24.5 58 35 60 49.5"></path>
      <!-- 笔画 5 -->
      <path d="M86.5 4C85.34 12.16 82.7 29.4 81.5 33C80.3 36.6 91 44.83 96.5 48.5"></path>
      <!-- 笔画 6 -->
      <path d="M93.5 23C96 35 86 50.5 77 49.5C68 48.5 64 18 100 18.5"></path>
      <!-- 笔画 7 -->
      <path d="M101 7.5C107 5.16 120.8 1.5 124 5.5C127.2 9.5 116.34 12.83 111.5 18C115.84 27.5 121.4 54 113 54C104.6 54 100 44 100 39C100 34 105 17.5 134 28"></path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { gsap } from "gsap";

const emit = defineEmits(['animationComplete', 'animationStart']);

onMounted(() => {
  const paths = document.querySelectorAll("svg path");
  const tl = gsap.timeline({
    onComplete: () => {
      emit('animationComplete');
    },
    onStart: () => {
      emit('animationStart');
    }
  });
  const baseSpeed = 0.012;

  paths.forEach((path) => {
    const length = (path as SVGPathElement).getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0,
    });

    tl.to(path, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: Math.max(0.2, length * baseSpeed),
      ease: "power2.inOut",
    });
  });
  
  // 添加一个提前0.2秒触发animationComplete的动画
  tl.to({}, {duration: 0.01, onComplete: () => emit('animationComplete')}, "-=0.2");
});
</script>

<style scoped>
.stroke-writer {
  display: inline-block;
}

svg {
  display: block;
  width: 100%;
  height: auto;
}

path {
  stroke: white;
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
}
</style>
