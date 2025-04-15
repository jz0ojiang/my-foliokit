<template>
  <div class="stroke-writer">
    <svg viewBox="0 0 136.012 56.4916" xmlns="http://www.w3.org/2000/svg">
      <!-- 笔画 1 -->
      <path d="M2 30.77C13.17 24.27 35 9.77 26.5 2.77C20.1 -2.83 16.17 23.77 15 37.77C15 32.6 17.1 22.07 25.5 21.27C33.9 20.47 27.1 35.97 29.5 36.77C31.9 37.57 43.5 34.27 47 28.77C50.5 23.27 42.3 15.97 39.5 26.77C36.7 37.57 49.5 37.77 54 35.27C58.5 32.77 73 8.77 64 3.77C55 -1.23 54 36.77 66 36.77C78 36.77 87.5 9.77 81.5 3.77C75.5 -2.23 67.5 32.77 81.5 36.77C93 37.51 86.5 21.27 96.77 21.3C102.77 21.3 104.5 27.51 102 33.51C99.5 39.51 88 40.01 89.9 28.62C91.79 17.23 100.5 22.01 103.5 23.51C106.5 25.01 112.5 21.27 112.5 21.27" />
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
  const baseSpeed = 0.007;

  paths.forEach((path) => {
    const length = (path as SVGPathElement).getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0,
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: Math.max(0.4, length * baseSpeed),
      ease: "power2.inOut",
    }, 0);

    tl.to(path, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<");
  });
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
