<template>
  <header>
    <div class="logo">
      <NuxtLink :to="localePath('/')">
        Portfolio
      </NuxtLink>
    </div>
    <div class="lang-select">
      <LangSwitcher class="desktop-only" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LangSwitcher from '../common/LangSwitcher.vue';
import { useLocalePath } from '#i18n'

const localePath = useLocalePath();
</script>

<style lang="postcss" scoped>
header {
  @apply flex w-full px-4 py-8;
  
  @apply justify-center; /* 默认（移动端）居中 */
  
  @screen sm {
    @apply justify-between items-center px-16;
  }
  
}

.logo {
  @apply text-2xl;
  font-family: "Poppins", sans-serif;
}

.desktop-only {
  @apply hidden;
  
  @screen sm {
    @apply block;
  }
}
</style>