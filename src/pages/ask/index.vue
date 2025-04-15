<template>
  <div
    class="ask-page"
    :class="{
      'ask-page--no-chat': conversation.length === 0,
      'ask-page--chat': conversation.length > 0,
    }"
  >
    <!-- 顶部问候语 -->
    <div class="greeting" v-if="conversation.length === 0">
      <div class="flex flex-col items-center justify-center gap-2 greeting-container">
        <StrokeAnimatesNihao v-if="locale === 'zh'" class="greeting-svg" />
        <StrokeAnimatesHello v-else class="greeting-svg__en" />
        <h2 class="text-4xl greeting-text">
          <span class="greeting-comma">,</span>
          {{ t("greeting") }}
        </h2>
      </div>
    </div>

    <!-- 对话区域 -->
    <div
      class="chat-container"
      ref="chatContainer"
      v-if="conversation.length > 0"
    >
      <div class="messages">
        <div
          v-for="(message, index) in conversation"
          :key="index"
          class="message-item"
          :class="{
            'message-item--user': message.role === 'user',
            'message-item--error': message.isError
          }"
        >
          <!-- 来源信息 -->
          <!-- 消息内容 -->
          <div
          class="message-content"
          >
          <div v-if="message.from" class="message-source">
            <span class="source-text">from: {{ message.from }}</span>
          </div>
            <!-- 用户消息直接显示原文 -->
            <span v-if="message.role === 'user'">{{ message.content }}</span>
            <!-- AI回复才使用格式化 -->
            <span v-else v-html="formatMessage(message.content)"></span>
          </div>
          <!-- 分页信息 -->
          <div v-if="message.pagination" class="message-meta">
            {{ message.pagination }}
          </div>
          <!-- 对话进度指示器 -->
          <div 
            v-if="message.role === 'assistant' && !message.isError" 
            class="conversation-progress"
            :class="{
              'conversation-progress--final': getConversationProgress(index) === '5/5'
            }"
          >
            {{ getConversationProgress(index) }}
          </div>
        </div>
        <div v-if="isStreaming" class="message-item">
          <div
            class="message-content typing-effect"
            v-html="formatMessage(streamingContent)"
          ></div>
          <div class="thinking-indicator">
            <div class="thinking-dot"></div>
          </div>
        </div>
      </div>
      
      <!-- 新对话按钮 -->
      <div 
        v-if="conversation.length > 0 && 
              conversation.filter(msg => msg.role === 'user').length === 5 && 
              !isStreaming && 
              conversation[conversation.length - 1].role === 'assistant'"
        class="new-chat-button-container"
      >
        <button 
          class="new-chat-button"
          @click="startNewChat"
          :title="t('newChat')"
        >
          <Icon name="uil:refresh" class="new-chat-icon" />
          {{ t('newChat') }}
        </button>
      </div>
    </div>

    <!-- 输入框区域 -->
    <div
      class="input-area"
      :class="{
        'input-area--initial': conversation.length === 0,
        'input-area--chat': conversation.length > 0,
      }"
    >
      <div class="search-container">
        <div class="search-box">
          <div 
            v-if="showFromSource" 
            class="from-source" 
            ref="fromSourceRef"
            @click="removeFrom"
          >
            [from: {{ fromSource }}]
          </div>
          <textarea
            v-model="query"
            class="search-input"
            :class="{ 'has-from': showFromSource }"
            :style="{ textIndent: showFromSource ? `${fromSourceWidth + 5}px` : '0' }"
            :placeholder
            @keydown.enter.exact.prevent="handleSearch"
            @keydown.shift.enter.prevent="handleNewLine"
            rows="1"
            @input="autoGrow"
            ref="textarea"
          />
          <button class="search-button" @click="handleSearch">
            <Icon name="uil:arrow-circle-up" class="search-button-icon" />
          </button>
        </div>
        <div v-if="conversation.length > 0" class="meta-text">
          {{ t("meta") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import DOMPurify from "dompurify";
import { useRoute } from "vue-router";
import { getProjectNameByAbbrlink } from "@/utils/getProjects";
import MarkdownIt from "markdown-it";

interface Message {
  role: "user" | "assistant";
  content: string;
  from?: string;
  pagination?: string;
  isError?: boolean;
  project_name?: string;
}

const { t, locale } = useI18n({ useScope: "local" });

definePageMeta({
  layout: "ask",
});

// 添加URL查询参数处理
const route = useRoute();
const fromSource = ref("");
const showFromSource = ref(false);
const fromSourceWidth = ref(0);
const fromSourceRef = ref<HTMLElement | null>(null);

// 状态
const query = ref("");
const conversation = ref<Message[]>([]);
const isStreaming = ref(false);
const streamingContent = ref("");
const chatContainer = ref<HTMLElement | null>(null);
const textarea = ref<HTMLTextAreaElement | null>(null);
const placeholder = ref(
  t("placeholder", {
    placeholder: t(`question${showFromSource.value ? '-with-from' : ''}.${Math.floor(Math.random() * 4)}`)
  })
);

const showGreetingText = ref(false);

// 更新placeholder
const updatePlaceholder = () => {
  placeholder.value = t("placeholder", {
    placeholder: t(`question${showFromSource.value ? '-with-from' : ''}.${Math.floor(Math.random() * 4)}`)
  });
};

// 监听showFromSource变化
watch(showFromSource, () => {
  updatePlaceholder();
});

// 计算来源文本宽度
const calculateFromSourceWidth = async () => {
  await nextTick();
  if (fromSourceRef.value && showFromSource.value) {
    fromSourceWidth.value = fromSourceRef.value.offsetWidth;
    console.log('Width calculated:', fromSourceWidth.value);
  } else {
    fromSourceWidth.value = 0;
  }
};

onMounted(() => {
  handleUrlQuery();
  scrollToBottom();
  document.fonts.ready.then(() => {
    nextTick(() => {
      calculateFromSourceWidth();
    });
  });
});

// 处理URL查询参数
const handleUrlQuery = () => {
  const { q, from } = route.query;
  
  if (from) {
    getProjectNameByAbbrlink(locale.value, from as string).then(async (name) => {
      fromSource.value = name || "";
      showFromSource.value = !!name;
      await calculateFromSourceWidth();
    });
  }
  
  if (q) {
    query.value = q as string;
    handleSearch();
  }
};

// 修改自动调整文本框高度的函数
const autoGrow = () => {
  if (textarea.value) {
    textarea.value.style.height = "auto";
    textarea.value.style.height = textarea.value.scrollHeight + "px";
  }
};

// 添加错误处理相关的i18n
const errorMessages = {
  429: t('errors.tooManyRequests'),
  500: t('errors.serverError'),
  404: t('errors.notFound'),
  default: t('errors.default')
} as const;

// 初始化markdown-it实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// 格式化消息（使用安全的HTML渲染）
const formatMessage = (content: string): string => {
  if (!content) return '';
  
  // 只有非用户消息才进行markdown渲染
  const formatted = content.startsWith('from:') 
    ? content.replace(/^from:(.*?)\n/, '<div class="message-source">from: $1</div>') 
    : content;
    
  // 使用markdown-it渲染内容
  const rendered = md.render(formatted);

  // 清理HTML
  return DOMPurify.sanitize(rendered);
};

// 滚动到底部
const scrollToBottom = () => {
  if (chatContainer.value) {
    nextTick(() => {
      chatContainer.value!.scrollTop = chatContainer.value!.scrollHeight;
    });
  }
};

// 发送查询
const handleSearch = async () => {
  if (!query.value.trim() || isStreaming.value) return;

  // 检查用户消息数量
  const userMessageCount = conversation.value.filter(msg => msg.role === 'user').length;
  if (userMessageCount >= 5) {
    // 添加一条错误消息
    conversation.value.push({
      role: "assistant",
      content: t('errors.tooManyMessages'),
      isError: true
    });
    scrollToBottom();
    return;
  }

  const userMessage: Message = {
    role: "user",
    content: query.value,
    from: showFromSource.value ? fromSource.value : undefined,
    project_name: showFromSource.value ? fromSource.value : undefined
  };
  conversation.value.push(userMessage);

  scrollToBottom();

  if (conversation.value.length > 10) {
    conversation.value = conversation.value.slice(-10);
  }

  const currentQuery = query.value;
  query.value = "";
  isStreaming.value = true;
  streamingContent.value = "";
  let currentFrom = "";
  let currentContent = "";
  let lastUpdateTime = Date.now();

  try {
    const response = await fetch("http://localhost:5000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: currentQuery,
        language: locale.value,
        conversation_history: conversation.value.slice(0, -1),
        search_all: !showFromSource.value,
        project_name: showFromSource.value ? fromSource.value : undefined
      }),
    });

    if (!response.ok) {
      let errorMessage = errorMessages.default;
      
      // 处理特定的HTTP状态码
      if (response.status === 429) {
        errorMessage = errorMessages[429];
      } else if (response.status === 500) {
        errorMessage = errorMessages[500];
      } else if (response.status === 404) {
        errorMessage = errorMessages[404];
      }

      // 尝试获取详细的错误信息
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = `${errorMessage}: ${errorData.error}`;
        }
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }

      throw new Error(errorMessage);
    }

    if (!response.body) throw new Error("Response body is null");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line) continue;
        try {
          const data = JSON.parse(line);
          if (data.from && data.from !== currentFrom) {
            currentFrom = data.from;
          }
          if (data.text) {
            currentContent += data.text;
            // 控制更新频率，每100ms更新一次
            const now = Date.now();
            if (now - lastUpdateTime >= 100) {
              streamingContent.value = currentFrom
                ? `from: ${currentFrom}\n${currentContent}`
                : currentContent;
              lastUpdateTime = now;
              scrollToBottom();
            }
          }
        } catch (e) {
          console.error("Failed to parse chunk:", e);
        }
      }
    }
    // 确保最后一次更新显示完整内容
    streamingContent.value = currentFrom
      ? `from: ${currentFrom}\n${currentContent}`
      : currentContent;
  } catch (error) {
    console.error("Error:", error);
    // 添加错误消息到对话
    const errorMessage: Message = {
      role: "assistant",
      content: error instanceof Error ? error.message : errorMessages.default,
      isError: true
    };
    conversation.value.push(errorMessage);
    scrollToBottom();
  } finally {
    if (streamingContent.value) {
      const assistantMessage: Message = {
        role: "assistant",
        content: streamingContent.value,
        from: currentFrom,
      };
      conversation.value.push(assistantMessage);
    }
    isStreaming.value = false;
    streamingContent.value = "";
    scrollToBottom();
    if (textarea.value) {
      textarea.value.style.height = "auto";
    }
  }
};

// 处理换行
const handleNewLine = () => {
  if (textarea.value) {
    const start = textarea.value.selectionStart;
    const end = textarea.value.selectionEnd;
    const value = textarea.value.value;
    textarea.value.value = value.substring(0, start) + '\n' + value.substring(end);
    textarea.value.selectionStart = textarea.value.selectionEnd = start + 1;
    autoGrow();
  }
};

// 删除来源文本
const removeFrom = () => {
  showFromSource.value = false;
  fromSource.value = "";
  query.value = "";
  nextTick(() => {
    if (textarea.value) {
      textarea.value.focus();
    }
  });
};

const handleAnimationEnd = () => {
  showGreetingText.value = true;
};

// 获取对话进度
const getConversationProgress = (messageIndex: number): string => {
  const userMessageCount = conversation.value
    .slice(0, messageIndex + 1)
    .filter(msg => msg.role === 'user').length;
  return `${userMessageCount}/5`;
};

// 判断是否是最后一条AI消息
const isLastAIMessage = (index: number): boolean => {
  const userMessageCount = conversation.value
    .slice(0, index + 1)
    .filter(msg => msg.role === 'user').length;
  return userMessageCount === 5 && !isStreaming.value;
};

// 开始新对话
const startNewChat = () => {
  conversation.value = [];
  query.value = '';
  if (textarea.value) {
    textarea.value.style.height = "auto";
  }
};
</script>

<style lang="postcss" scoped>
.ask-page {
  @apply flex flex-col px-4 py-12 pt-0 md:px-8;
  height: 80vh;
  background-color: var(--color-surface-default);
  font-family: 'LXGW WenKai', 'LXGW WenKai Full', sans-serif;
  font-display: swap;

  &--no-chat {
    @apply justify-center;
  }

  &--chat {
    @apply justify-between;
    padding-bottom: 7rem;
  }
}

.greeting {
  @apply text-center mb-16 transition-all duration-500;

  &--hidden {
    @apply opacity-0 h-0 mb-0 overflow-hidden;
  }
}

.greeting-container {
  @apply flex flex-col items-center justify-center gap-2;
  @screen md {
    @apply flex-row;
  }
}

.greeting-svg {
  @apply w-36 p-2 mr-[-.5rem];
}

.greeting-svg__en {
  @apply w-40 mr-[-2rem] mb-[-1rem];
  @screen md {
    @apply mr-[-1rem];
  }
}

.greeting-text {
  @apply text-4xl mt-[.5rem];
  @screen md {
    @apply mt-0;
  }
}

.greeting-text--visible {
  opacity: 1;
  transform: translateX(0);
}

.greeting-text--visible ~ .greeting-svg,
.greeting-text--visible ~ .greeting-svg__en {
  transform: translateX(-1rem);
}

.input-area {
  @apply w-full transition-all duration-500;

  &--initial {
    @apply flex items-center justify-center;
  }

  &--chat {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: var(--color-surface-default);
    z-index: 10;
  }
}

.search-container {
  @apply w-full max-w-3xl mx-auto mb-4;
}

.search-box {
  @apply relative flex items-start;
  background-color: #1b1e2e;
  border-radius: 1.25rem;
  padding: 1.5rem 2rem;
}

.from-source {
  @apply text-blue-500 font-bold inline-flex items-center;
  position: absolute;
  left: 2rem;
  top: 1.5rem;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: 'LXGW WenKai', 'LXGW WenKai Full', sans-serif !important;

  &:hover {
    color: var(--color-error);
    text-decoration: line-through;
  }
}

.search-input {
  @apply flex-1 bg-transparent outline-none resize-none text-lg;
  color: var(--color-text-primary);
  min-height: 4rem;
  max-height: 20rem;
  line-height: 1.5;
  padding-right: 3rem;
  overflow-y: auto;
  width: 100%;

  &.has-from {
    padding-left: calc(v-bind(fromSourceWidth) + 16px);
  }

  &::placeholder {
    color: var(--color-text-tertiary);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-scrollbar);
    border-radius: 3px;
  }
}

.search-button {
  @apply absolute right-6 bottom-4 text-gray-400 hover:text-gray-300 transition-colors;
}

.search-button-icon {
  width: 1.6rem;
  height: 1.6rem;
}

.chat-container {
  @apply w-full max-w-3xl mx-auto flex-1 mb-8 overflow-y-auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-scrollbar);
    border-radius: 3px;
  }
}

.messages {
  @apply space-y-8;
}

.message-item {
  @apply space-y-2;

  &--user {
    @apply flex flex-col items-end;

    .message-content {
      @apply bg-blue-600/20 rounded-2xl px-6 py-4;
    }
  }

  &--error {
    .message-content {
      color: var(--color-error);
    }
  }
}

.message-source {
  @apply text-sm;
  color: var(--color-link);
}

.source-text {
  @apply underline;
}

.message-content {
  @apply text-base leading-relaxed break-words max-w-[85%];
  color: var(--color-text-primary);

  :deep(p) {
    @apply mb-4;
  }

  :deep(ul) {
    @apply list-disc list-inside mb-4;
  }

  :deep(ol) {
    @apply list-decimal list-inside mb-4;
  }

  :deep(li) {
    @apply mb-2;
  }

  :deep(code) {
    @apply px-1 py-0.5 rounded bg-gray-700 text-gray-200 font-mono text-sm;
  }

  :deep(pre) {
    @apply p-4 rounded bg-gray-800 overflow-x-auto mb-4;
    code {
      @apply bg-transparent p-0;
    }
  }

  :deep(blockquote) {
    @apply border-l-4 border-gray-600 pl-4 italic my-4;
  }

  :deep(a) {
    @apply text-blue-400 hover:text-blue-300 underline;
  }

  :deep(h1, h2, h3, h4, h5, h6) {
    @apply font-bold mb-4 mt-6;
  }

  :deep(h1) { @apply text-2xl; }
  :deep(h2) { @apply text-xl; }
  :deep(h3) { @apply text-lg; }
}

.message-meta {
  @apply text-right text-sm;
  color: var(--color-text-secondary);
}

.meta-text {
  @apply text-center text-sm mt-2;
  color: var(--color-text-tertiary);
}

.thinking-indicator {
  @apply flex justify-start mt-2 p-2;
}

.thinking-dot {
  @apply w-3 h-3 bg-blue-500 rounded-full;
  animation: thinking 1.5s infinite;
}

@keyframes thinking {
  0% {
    transform: scale(0.4);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }

  100% {
    transform: scale(0.4);
    opacity: 0.3;
  }
}

.typing-effect {
  animation: typing 0.1s steps(1);
}

@keyframes typing {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.greeting-comma {
  @apply hidden;
  @screen md {
    @apply inline;
  }
}

.conversation-progress {
  @apply text-sm text-right mt-2;
  color: var(--color-text-secondary);
  opacity: 0.8;

  &--final {
    color: var(--color-error);
    opacity: 1;
  }
}

.new-chat-button-container {
  @apply flex justify-center mt-8;
}

.new-chat-button {
  @apply flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200;
  background-color: var(--color-surface-raised);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);

  &:hover {
    background-color: var(--color-surface-raised-hover);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.new-chat-icon {
  @apply w-5 h-5;
  color: var(--color-text-primary);
}
</style>

<i18n lang="yaml">
zh:
  greeting: "有什么想问的吗？"
  placeholder: "你可以问我: {placeholder}"
  question:
    - 有哪些项目是Vue项目？
    - 有哪些项目是全栈项目？
    - 有哪些项目是后端项目？
    - 向我介绍 FolioKit
  question-with-from:
    - 这个项目的亮点是什么？
    - 这个项目用到了哪些技术？
    - 这个项目是基于什么框架开发的？
    - 这个项目是基于什么语言开发的？
  inputPlaceholder: "请输入问题..."
  send: "发送"
  error: "请求失败，请稍后再试。"
  meta: "内容由 AI 生成，请注意辨别"
  errors:
    tooManyRequests: "请求过于频繁，请稍后再试"
    serverError: "服务器出现错误，请稍后再试"
    notFound: "请求的资源不存在"
    default: "请求失败，请稍后再试。"
    tooManyMessages: "单次对话不能超过5条，请开始新的对话"
  newChat: "开始新对话"
en:
  greeting: "what would you like to ask?"
  placeholder: "You can ask me: {placeholder}"
  question:
    - What are the Vue projects?
    - What are the full-stack projects?
    - What are the back-end projects?
    - Introduce FolioKit to me
  question-with-from:
    - What are the highlights of this project?
    - What technologies are used in this project?
    - What framework is this project based on?
    - What language is this project based on?
  inputPlaceholder: "Enter your question..."
  send: "Send"
  error: "Request failed, please try again later."
  meta: "Content generated by AI, please pay attention to the distinction"
  errors:
    tooManyRequests: "Too many requests, please try again later"
    serverError: "Server error, please try again later"
    notFound: "The requested resource was not found"
    default: "Request failed, please try again later."
    tooManyMessages: "Single conversation cannot exceed 5 messages, please start a new conversation"
  newChat: "Start New Chat"
</i18n>
