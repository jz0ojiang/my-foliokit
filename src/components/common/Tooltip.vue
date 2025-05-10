<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition name="tooltip-fade">
      <div 
        v-if="modelValue" 
        ref="tooltipRef"
        class="tooltip" 
        :class="[placement]"
        :style="tooltipStyle"
        role="tooltip"
      >
        <div class="tooltip-arrow" v-if="showArrow"></div>
        <div class="tooltip-content">
          <div class="tooltip-icon">💡</div>
          <div class="tooltip-text">
            <slot>
              <div>支持自然语言提问、关键词搜索、标签跳转：</div>
              <ul>
                <li>"有哪些前端项目？"</li>
                <li>/maimai 搜索正文内容</li>
                <li>#Vue 查看标签项目</li>
                <li>留空将跳转到对话页面</li>
              </ul>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';

// 定义组件属性
const props = defineProps({
  // 控制显示/隐藏
  modelValue: {
    type: Boolean,
    default: false
  },
  // 触发元素，CSS选择器或DOM元素
  target: {
    type: [String, Object],
    required: true
  },
  // 弹出位置
  placement: {
    type: String,
    default: 'top',
    validator: (val: string) => ['top', 'bottom', 'left', 'right'].includes(val)
  },
  // 是否显示箭头
  showArrow: {
    type: Boolean,
    default: true
  },
  // 自动隐藏
  autoHide: {
    type: Boolean,
    default: false
  },
  // 自动隐藏延迟
  duration: {
    type: Number,
    default: 3000
  },
  // 是否传送到body
  teleport: {
    type: Boolean,
    default: true
  },
  // 自定义偏移
  offset: {
    type: Array,
    default: () => [0, 10]
  },
  // 自定义z-index
  zIndex: {
    type: Number,
    default: 2000
  }
});

const emit = defineEmits(['update:modelValue']);

// tooltip元素引用
const tooltipRef = ref<HTMLElement | null>(null);
// 目标元素
const targetEl = ref<HTMLElement | null>(null);
// 自动隐藏定时器
let autoHideTimer: number | null = null;

// 获取目标元素
const getTargetElement = (): HTMLElement | null => {
  if (typeof props.target === 'string') {
    return document.querySelector(props.target);
  } else if (props.target instanceof HTMLElement) {
    return props.target;
  }
  return null;
};

// 计算tooltip样式
const tooltipStyle = computed(() => {
  return {
    zIndex: props.zIndex
  };
});

// 更新tooltip位置
const updatePosition = () => {
  if (!tooltipRef.value || !targetEl.value) return;
  
  const tooltipEl = tooltipRef.value;
  const target = targetEl.value;
  const targetRect = target.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  
  let top = 0;
  let left = 0;
  const offsetX = Number(props.offset[0] || 0);
  const offsetY = Number(props.offset[1] || 10);
  
  switch (props.placement) {
    case 'top':
      top = targetRect.top - tooltipRect.height - offsetY;
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2) + offsetX;
      break;
    case 'bottom':
      top = targetRect.bottom + offsetY;
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2) + offsetX;
      break;
    case 'left':
      top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2) + offsetX;
      left = targetRect.left - tooltipRect.width - offsetY;
      break;
    case 'right':
      top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2) + offsetX;
      left = targetRect.right + offsetY;
      break;
  }
  
  // 计算绝对位置（相对于文档）
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
  tooltipEl.style.top = `${top + scrollTop}px`;
  tooltipEl.style.left = `${left + scrollLeft}px`;
};

// 设置自动隐藏定时器
const setupAutoHide = () => {
  if (props.autoHide && !autoHideTimer) {
    autoHideTimer = window.setTimeout(() => {
      emit('update:modelValue', false);
      autoHideTimer = null;
    }, props.duration);
  }
};

// 清除自动隐藏定时器
const clearAutoHide = () => {
  if (autoHideTimer) {
    clearTimeout(autoHideTimer);
    autoHideTimer = null;
  }
};

// 监听props.modelValue变化
watch(() => props.modelValue, (value) => {
  if (value) {
    // 当显示时
    nextTick(() => {
      targetEl.value = getTargetElement();
      updatePosition();
      setupAutoHide();
      
      // 添加窗口大小变化监听
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    });
  } else {
    // 当隐藏时
    clearAutoHide();
    
    // 移除监听
    window.removeEventListener('resize', updatePosition);
    window.removeEventListener('scroll', updatePosition, true);
  }
});

// 组件卸载前
onUnmounted(() => {
  clearAutoHide();
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
});

// 导出方法
defineExpose({
  updatePosition
});
</script>

<style scoped>
.tooltip {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 500px;
  pointer-events: auto;
}

.tooltip-content {
  display: flex;
  align-items: flex-start;
  background-color: #1e1f23;
  border-radius: 8px;
  padding: 16px 20px;
  color: white;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
}

.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
  pointer-events: none;
}

.tooltip.top .tooltip-arrow {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px 8px 0;
  border-top-color: #1e1f23;
}

.tooltip.bottom .tooltip-arrow {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 8px 8px;
  border-bottom-color: #1e1f23;
}

.tooltip.left .tooltip-arrow {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 8px 0 8px 8px;
  border-left-color: #1e1f23;
}

.tooltip.right .tooltip-arrow {
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 8px 8px 8px 0;
  border-right-color: #1e1f23;
}

.tooltip-icon {
  margin-right: 12px;
  font-size: 24px;
  line-height: 1.5;
}

.tooltip-text {
  font-size: 14px;
  line-height: 1.5;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 8px;
  margin-bottom: 0;
}

li {
  margin-bottom: 4px;
}

li:last-child {
  margin-bottom: 0;
}

/* 淡入淡出动画 */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>