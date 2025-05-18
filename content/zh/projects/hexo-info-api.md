---
title: hexo-info-api
date: 2022-09-06
description: 为 Hexo 添加 API 支持的插件，支持 CORS 与接口配置开关 # optional ; 可选项
cover: https://image.im0o.top/2022/202209061913881.png # optional ; 可选项
tags:
  - JavaScript
  - Hexo
  - NPM#FF6B6B
link: https://github.com/jz0ojiang/hexo-info-api # optional ; 可选项
abbrlink: 0e405eff
---

<!-- 项目正文内容，可支持 Markdown 格式 / Project content below, supports Markdown format -->

## 项目简介

`hexo-info-api` 是为 Hexo 博客静态站点设计的 API 插件，通过生成 JSON 文件并注册中间件实现 API 功能，支持自定义启用的接口与跨域访问设置，适合用于站内搜索、站点统计等场景。

- 🔁 通过 `hexo.extend.generator` 输出结构化 API 接口
- 🌍 注册 `server_middleware` 支持 CORS 设置，实现跨源访问
- 🧩 支持用户自定义接口扩展，适配任意前端逻辑
- 🧱 默认内置 10+ 常用接口（如：文章列表、标签分类、最新文章）

## 技术实现亮点

- 借助 Hexo 的生命周期注册系统构建 API 路由；
- 使用 `senchalabs/connect` 中间件为 Hexo Server 添加跨域支持；
- 接口以模块形式组织，通过配置启用/禁用，提升插件可维护性与扩展性；
- 在 Hexo 中模拟了“后端 API 层”，为静态博客提供前后端解耦能力。

## 示例接口

- `GET /api/getPosts`：获取文章列表
- `GET /api/getPostByPath/:path`：通过路径获取指定文章内容
- `GET /api/getCategories` / `getTags`：获取全站分类与标签
- `GET /api/getLatestPost`：获取最近一篇文章

📦 [npm 包链接](https://www.npmjs.com/package/hexo-info-api)

📄 [开发记录博客](https://blog.im0o.top/posts/d3bc8dff.html)
