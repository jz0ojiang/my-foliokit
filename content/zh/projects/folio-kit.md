---
title: FolioKit
date: 2025-04-15
description: AI 驱动的个人作品集生成器，支持语义问答与多语言内容展示
endDate: present
cover: /images/example-cover.png
tags:
  - FolioKit
  - Nuxt
  - Python
  - Flask#3B80C2
  - AI
link: https://github.com/jz0ojiang/Foliokit
top: true
weight: 5
no_ai: false
abbrlink: 9bbc228c
---

> 内容部分由 ChatGPT 总结，ai味可能比较浓 \:D

FolioKit 是一个现代化的个人作品集生成器，专为开发者打造。它采用前后端分离架构，前端使用 Nuxt3 构建，后端使用 Flask 提供 API 服务。项目集成了 AI 能力，支持语义搜索和智能问答，让作品展示更加生动有趣。

## 🎯 核心特性

## 🧩 项目结构概览

* 前端：Nuxt3、TypeScript、TailwindCSS、Nuxt Content、i18n、GitHub Actions
* 后端：Flask、LlamaIndex、OpenAI API、本地 JSON 向量存储
* 部署：前后端分离，前端丢 Vercel，后端跑在 Linux 容器里，用 Nginx 代理

## 💭 为什么要做这个？

我自己项目太多，写了博客也没人看，单独介绍又太零散。想要一个更系统性的、能展示项目又能智能回答问题的平台。网上那种 linktree / bento 用起来还是受限，就干脆写了个自己的。

## 🎨 关于设计

页面很空，没有导航。只有一个 hello 动画和搜索框。我把“关于我”那些藏在搜索框下面一个小链接里了。

作品展示用卡片，加载几次后就提示跳转完整列表。全站暗色模式——因为我就喜欢用暗色，没做亮色。

响应式靠弹性盒子撑起来，不太用 media query。详情页也从卡片样式变成了现在的扁平风，感觉简洁很多。

## 🛠 前端开发细节

* 默认关闭 SSR 模式，原本想 Nuxt 直接全栈做掉，但后面测下来 llamaindex 在 serverless 环境冷启动慢、不稳定，就干脆关了，用 API 分离的方式来跑

* GitHub Actions 自动部署，CI/CD 走得挺顺的，Vercel 接得也方便

* 项目数据都写在 Markdown 里，frontmatter 管理元信息

* 支持 tag#hex 直接在 frontmatter 设置标签颜色

* Tailwind 用 @apply 写 SCSS，行内 class 太多我不太能忍

* 字体我做了子集化，还配了 font/font-full 两种加载模式来优化体验

* 目录结构是自定义的，把东西都丢 src 里，部分 Nuxt 插件还留在根目录

* 关闭了 SSR，serverless 启 llamaindex 太慢了不划算

## 🤖 AI 协作部分

这项目我是在 Cursor IDE 里写的，还氪了会员。它侧边那个 AI 帮我查文档、补 tailwind 配置非常方便，远比一个命令行 AI 助手要好。

过程中我也意识到：AI 不只是代码补全工具，应该是结构感知型的对话协作者。Cursor 算是在这个方向上比较符合我预期的。

## 🔧 后端（foliokit-api）

foliokit-api 所有参数都可通过 `.env` 配置，包括模型类型（支持换成 DeepSeek 等）、OpenAI Key、Redis 地址等。如果 Redis 不填，逻辑会自动跳过缓存处理。

Flask 项目结构是用工厂函数 + Blueprint 分模块组织的，便于维护和拓展。

用 Flask 写的，很轻量。我一开始是为了跑 llamaindex demo，后来干脆直接做成了服务。

支持的东西包括：

* 本地 JSON 存储的向量索引，处理项目内容和结构
* OpenAI 接口接入（其实换 DeepSeek 也行，.env 文件里设就行）
* Redis 是可选的，留空自动关闭
* 部署用 gunicorn + nginx + HTTPS

## 🧠 Prompt 工程

Prompt 系统有按语言分别设置 system prompt，比如英文下强调“Always respond in English”，中文下强调“不要虚构内容”。

Prompt 结构是自定义的 XML 包 JSON，像这样：

```xml
<msg_json>
{
  "user_message": "...",
  "message_info": "...",
  "requirements": [...]
}
</msg_json>
```

这样可以防 prompt 注入。我甚至用脚本狂轰自己的 API，试着让它“人格错乱”或者生成奇怪内容，实测能拦下大部分攻击 prompt。

Prompt 本身也做了分语言的 system 模板，像“不得虚构内容”“优先基于 context 回答”这种也都写进去了。

## 🔁 回答机制

* 启用了 OpenAI 的流式输出，能前端实时加载文字
* 没匹配到向量时会自动 fallback 到全量内容里找，尽量别让用户问了个寂寞

## 🔧 部署配置与扩展性

我用 `.env` 控制模型选择、缓存等参数，迁移也方便。部署逻辑清晰，未来打算加个注册系统，搞点 plan 分级和权限控制。

> *当然啦，这些只是构想，实际还没做。*

## 🎨 UI 细节

Pixso 上画的草图没完全照搬，实际写的时候改了不少。但整体配色、结构方向还是统一的。

tag 的颜色管理统一写进 tag.css 里，语义清晰，也方便改。

## ✅ 总结

FolioKit 是一个我写来自己用、也希望别人觉得“原来作品集还能这样搞”的项目。

希望它能作为“AI+内容平台”结构探索的一种可能：项目不只是被动陈列，而是可以被提问、被理解、被重组。
