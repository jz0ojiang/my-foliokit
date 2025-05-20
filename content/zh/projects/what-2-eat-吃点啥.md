---
title: What2Eat：今天吃点啥？
date: 2021-12-12
endDate: 2025-05-18
description: 一个帮助选择“今天吃什么”的食物推荐工具，经历 Vue2 原型与 Vue3 重构两个阶段
cover: https://image.im0o.top/2025/202505182341565.png
tags:
  - Vue
  - TypeScript
  - Vite
  - 重构实践#4A90E2
link: https://github.com/akinodev/whattoeat
weight: 5
abbrlink: 309cbe5c
---

## 🥡 项目简介

What2Eat 是一个轻量工具类前端项目，帮助用户在选择困难时快速决定“吃点啥”。项目最初开发于 2021 年底，采用 Vue2 和 Element UI 快速实现原型；2025 年进行了全面重构，采用 Vue3 + TypeScript + Vite 技术栈，结构更清晰、体验更现代。

## 📌 时间线

- **v1 开发时间**：2021 年 12 月 12 日 – 2022 年 2 月 13 日
- **v2 重构时间**：2025 年 5 月 18 日

## 🧰 技术演进

| 项目版本 | 技术栈 | 说明 |
|----------|--------|------|
| v1 | Vue 2 + Element UI + Axios | 使用 CDN 快速搭建，数据从 JSON 异步加载，搭配动画模拟抽签 |
| v2 | Vue 3 + TypeScript + Vite | 使用模块导入结构化数据与图片，支持标签筛选，构建速度更快，部署更轻便 |

## 💡 功能亮点

- 支持从标签中筛选食物类别（如“主食”“辣味”等）
- 本地图片资源明确 `import`，构建期由 Vite 自动处理
- 使用 Composition API 管理状态，逻辑简洁清晰
- 部署于 Cloudflare Pages 或 Vercel，零后端依赖

## 🧠 设计思路

v1 强调快速实现与“可玩性”，如动画抽签效果；v2 更关注代码可维护性与用户体验，数据结构重构为强类型对象，图片与标签绑定清晰，适合迭代更多玩法。
