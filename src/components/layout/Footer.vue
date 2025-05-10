<template>
  <footer class="footer">
    <div class="social-links">
      <a href="https://github.com/jz0ojiang" target="_blank" rel="noopener" class="social-link">
        <Icon name="mdi:github" />
      </a>
      <a href="https://x.com/jz0ojiang" target="_blank" rel="noopener" class="social-link">
        <Icon name="ph:x-logo" />
      </a>
      <a href="https://t.me/jz0ojiang" target="_blank" rel="noopener" class="social-link">
        <Icon name="mdi:telegram" />
      </a>
      <div class="wechat-container" @mouseenter="showWechatQR = true" @mouseleave="showWechatQR = false">
        <a class="social-link">
          <Icon name="mdi:wechat" />
        </a>
        <transition name="fade">
          <div v-if="showWechatQR" class="qr-code">
            <img src="/images/wechat-qr.jpg" alt="微信二维码" />
            <div class="qr-tip">{{ t('scanToAdd') }}</div>
          </div>
        </transition>
      </div>
      <a href="mailto:hi@im0o.top" class="social-link">
        <Icon name="mdi:email" />
      </a>
    </div>
    <div class="motto">
      「{{ t('motto') }}」
    </div>
    <div class="copyright">
      © {{ new Date().getFullYear() }}. Built with <NuxtLink to="https://github.com/jz0ojiang/Foliokit" target="_blank" class="folio-link">FolioKit</NuxtLink> – {{ t('footerDesc') }}.
    </div>
    <LangSwitcher class="mobile-lang-switcher" :popup-top="true" />
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LangSwitcher from '@/components/common/LangSwitcher.vue'
import { ref } from 'vue'

const { t } = useI18n({
  useScope: 'local'
})

const showWechatQR = ref(false)
</script>

<style lang="postcss" scoped>
.footer {
  @apply flex flex-col items-center justify-center py-8 gap-2;
  background-color: var(--color-surface-muted);
}

.social-links {
  @apply flex items-center gap-3 mb-2;
}

.social-link {
  @apply text-2xl transition-colors duration-200 flex items-center justify-center;
  color: var(--color-text-secondary);
  width: 2rem;
  height: 2rem;
  
  &:hover {
    color: var(--color-text-primary);
  }
}

.wechat-container {
  @apply relative flex items-center justify-center;
  width: 2rem;
  height: 2rem;
}

.qr-code {
  @apply absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 p-2 rounded-lg shadow-lg;
  background-color: var(--color-surface-card);
  z-index: 10;
  width: 9rem;
  
  img {
    @apply w-32 h-32 object-cover rounded;
  }
}

.qr-tip {
  @apply text-xs text-center mt-1;
  color: var(--color-text-secondary);
}

.motto {
  @apply text-sm mb-1;
  color: var(--color-text-secondary);
}

.copyright {
  @apply text-sm;
  color: var(--color-text-secondary);
}

.folio-link {
  color: var(--color-link);
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--color-accent);
  }
}

.mobile-lang-switcher {
  display: block;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .mobile-lang-switcher {
    display: none;
  }
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
</style>

<i18n lang="yaml">
zh:
  motto: "光阴如梦，昨日随风"
  footerDesc: "一个开源的作品集生成器"
  scanToAdd: "扫码添加微信"
en:
  motto: "Time passes like a dream, yesterday fades away."
  footerDesc: "an open-source portfolio builder"
  scanToAdd: "Scan to add WeChat"
</i18n> 