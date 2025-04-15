<template>
    <div class="layout">
      <LayoutHeader />
      <main class="main">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style lang="postcss" scoped>
  .layout {
    @apply min-h-screen flex flex-col;
  }
  
  .main {
    @apply flex-1;
  }
  </style>