---
title: DESU.Life 官网开发
date: 2023-09-01
description: 一个支持多语言切换、响应式布局、并专注于极致加载性能与用户体验的工作室官网。
endDate: present # date / optional / support present ; 日期 / 可选项 / 支持 present (至今)
cover: https://image.im0o.top/2025/202506071444788.png # optional ; 可选项
tags:
  - Vue
  - Vite
  - TypeScript
  - i18n#4A90E2
  - CI/CD#2ECC71
  - 前端优化#F49D37
link: https://github.com/desu-life/desu-life # optional ; 可选项
top: false # optional ; 可选项
draft: false # optional ; 可选项
weight: 5 # optional ; 可选项
no_ai: false # optional ; 可选项
abbrlink: 0894082f
---

DESU.Life 是一个支持多语言切换、响应式布局、并专注于极致加载性能与用户体验的个人/工作室官网。本项目采用 Vue3 + Vite + TypeScript 构建，聚焦内容展示、速度优化与开发体验的提升。

本人从项目初期主导开发，涉及 UI 设计还原、性能优化、组件架构、国际化支持、CI/CD 流程等多个方面。

---

## 💡 项目亮点与技术实现

### 📦 字体与资源优化
- 利用 [子集化处理](https://blog.im0o.top/posts/e1035436.html) 精简页面字体，控制文件大小在 10KB 以内，避免加载整套 CJK 字体造成卡顿；
- 所有图片统一转换为 WebP，并结合懒加载与渐进式加载，最大限度提升用户加载体验；
- 启用 gzip 并关闭 `no-compress` 静态规则，通过 [Nginx 配置优化压缩策略](https://blog.im0o.top/posts/a967f839.html)。

### 🖼️ 渐进式图片加载（Progressive Loading）
- 通过 TSX 渲染图片组件，使用 `<img srcset>` 模拟 progressive 行为；
- 加入错误回退逻辑、placeholder 支持、SSR 兼容；
- 实现参考：[实现渐进式加载](https://blog.im0o.top/posts/116723d.html)、[图片懒加载](https://blog.im0o.top/posts/bf087cd4.html)。

### ⚡ 异步组件 + 首屏加载提速
- 首屏内容以骨架屏和 `defineAsyncComponent` 方式引入，提升 perceived performance；
- 首屏加载时间由 **6 秒降至 2 秒**；
- 技术解析详见：[首屏加载优化方案](https://blog.im0o.top/posts/6317b38a.html)。

### 🌍 国际化（i18n）支持
- 使用 `vue-i18n` + Gitlocalize 建立翻译工作流，支持中、英、日、韩；
- 所有页面内容支持动态切换语言，并设置 HTML lang 属性，提升 SEO 与可访问性；
- 翻译资源结构与组件已解耦，支持多站点共享翻译文件。

### 🔁 CI/CD 自动部署与认证机制
- 基于 GitHub Actions 实现自动发布流程：
  - 推送 `release` 版本后触发构建与部署；
  - 自动上传产物至服务器并更新版本状态；
- 使用 [基于时间戳的 HMAC 动态认证](https://blog.im0o.top/posts/29f324f.html) 保护部署接口；
- 搭配 [语义化提交规范](https://blog.im0o.top/posts/31eaaef6.html) 自动判断版本号和生成 Changelog。

### 🧱 组件模块化与可维护性提升
- 使用 TSX 编写部分高复用组件，如图像卡片、交互按钮等；
- 将 `Device`, `DefaultModal`, `Footer`, `SEOBlock` 等模块分离封装，提升复用性与逻辑独立性；
- 支持命名导入、别名路径（@ => src），优化开发体验。

---

## 🔗 项目链接
- 官网源码：[github.com/desu-life/desu-life](https://github.com/desu-life/desu-life)
- 官网地址：[desu.life](https://desu.life)

---

## 📖 延伸阅读
- [使用 Vue + tsx 实现渐进式图片加载](https://blog.im0o.top/posts/116723d.html)
- [字符子集化：前端项目优化（1）](https://blog.im0o.top/posts/e1035436.html)
- [Gzip 压缩：前端项目优化（2）](https://blog.im0o.top/posts/a967f839.html)
- [图片懒加载：前端项目优化（3）](https://blog.im0o.top/posts/bf087cd4.html)
- [使用异步组件提升首屏加载速度（4）](https://blog.im0o.top/posts/6317b38a.html)
- [用时间戳和 HMAC 实现一次性部署认证](https://blog.im0o.top/posts/29f324f.html)
- [借助 GitHub Actions + 语义化提交自动版本发布](https://blog.im0o.top/posts/31eaaef6.html)