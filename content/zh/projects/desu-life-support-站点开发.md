---
title: DESU.Life Support 站点开发
date: 2025-05-24
description: 一个专注于极致加载性能与用户体验的工作室支持站点。
endDate: present # date / optional / support present ; 日期 / 可选项 / 支持 present (至今)
cover: https://image.im0o.top/2025/202506071520165.png
tags:
  - Astro#2ECC71
  - Svelte
  - SSG#F49D37
  - CI/CD#4A90E2
  - UI设计#F49D37
  - SEO#2ECC71
link: https://github.com/desu-life/support-desu-life # optional ; 可选项
top: false # optional ; 可选项
draft: false # optional ; 可选项
weight: 5 # optional ; 可选项
no_ai: false # optional ; 可选项
abbrlink: 3a3fdb9d
---

**DESU.Life Support** 是 DESU.Life 项目的支持与下载服务子站，主要服务于设备用户，提供配置器下载、说明书、安装手册和技术文档等内容。本人独立负责该站点的 **UI 设计与前端开发**，聚焦极致性能、可访问性和信息架构清晰性。

---

## 🚀 性能与优化亮点

- 使用 Astro 实现全站静态化渲染（SSG），结合 Nginx 启用 gzip，显著降低加载时间；
- 利用 [PageSpeed Insights](https://pagespeed.web.dev/) 优化性能得分至 **100 / 100（移动与桌面双端）**；
- 剩余优化项仅为少量图片（约 60KB）压缩建议与部分无障碍标签，**不影响满分得分**；
- SEO 部分使用 Screaming Frog SEO Spider 进行死链检查与结构优化，配合手动编写 `robots.txt` 与插件自动生成 `sitemap.xml`。

![](https://image.im0o.top/2025/202506071517189.png)

![](https://image.im0o.top/2025/202506071518553.png)

---

## 🎨 UI 与组件架构

- 全站 UI 由本人设计并实现，支持深色模式与响应式布局；
- 组件包括：Dropdown、Drawer、DownloadBanner、SearchContent、IconLabel、Note、Product 等；
- 内容结构通过 markdownX 渲染，并使用统一的 `.mdx` 脚手架文件 (`scaffold/`) 控制布局与封面样式。

![](https://image.im0o.top/2025/202506071519036.png)

---

## ⚙️ 自动部署与语义化发布

- 配置 GitHub Actions 实现构建与发布自动化（位于 `.github/workflows/build-and-deploy.yml`）；
- 使用语义化提交（Conventional Commits）作为触发条件，自动区分常规更新与版本发布；
- 搭配 HMAC 时间戳机制确保构建接口部署安全，详见相关博客：
  - [用时间戳和 HMAC 实现一次性密码](https://blog.im0o.top/posts/29f324f.html)
  - [语义化提交驱动自动版本发布](https://blog.im0o.top/posts/31eaaef6.html)

---

## 📦 项目结构简要（部分）

```text
├── public/
│   ├── images/[devices, posts, products]/
│   └── robots.txt
├── scaffold/                   ← 自定义内容模板
├── src/
│   ├── components/             ← 常用组件 + Markdown Block
│   ├── content/[firmware, posts, products, terms]/
│   ├── pages/                  ← Astro 页面入口（支持路由）
│   ├── utils/                  ← 工具函数（如 MDX 提取）
│   └── assets/css/            ← Tailwind、主色系统等样式
├── .github/workflows/         ← 自动部署 CI 流程
├── svelte.config.js, astro.config.mjs
```

---

## 🔗 项目地址

* 在线体验：[support.desu.life](https://support.desu.life/)
* GitHub 源码：[github.com/desu-life/support-desu-life](https://github.com/desu-life/support-desu-life)
