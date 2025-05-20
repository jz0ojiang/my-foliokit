---
title: "What2Eat: What to Eat Today?"
date: 2021-12-12
endDate: 2025-05-18
description: A food recommendation tool to help decide "what to eat today", evolving through Vue2 prototype and Vue3 refactoring phases
cover: https://image.im0o.top/2025/202505182341565.png
tags:
  - Vue
  - TypeScript
  - Vite
  - Refactoring Practice#4A90E2
link: https://github.com/akinodev/whattoeat
weight: 5
abbrlink: 41adcf6d
---

## 🥡 Project Introduction

What2Eat is a lightweight frontend utility project that helps users quickly decide "what to eat" when facing decision fatigue. Initially developed in late 2021 using Vue2 and Element UI for rapid prototyping, the project underwent a comprehensive refactoring in 2025, adopting the Vue3 + TypeScript + Vite stack for clearer structure and more modern user experience.

## 📌 Timeline

- **v1 Development Period**: December 12, 2021 – February 13, 2022
- **v2 Refactoring Date**: May 18, 2025

## 🧰 Technical Evolution

| Version | Tech Stack | Description |
|---------|------------|-------------|
| v1 | Vue 2 + Element UI + Axios | Quick setup using CDN, async data loading from JSON, with animation simulating fortune drawing |
| v2 | Vue 3 + TypeScript + Vite | Structured data and images using module imports, tag filtering support, faster builds, and lighter deployment |

## 💡 Key Features

- Support for filtering food categories by tags (e.g., "Main Course", "Spicy", etc.)
- Local image resources explicitly `import`ed, automatically processed by Vite during build
- State management using Composition API for clean and clear logic
- Deployment on Cloudflare Pages or Vercel with zero backend dependencies

## 🧠 Design Philosophy

v1 emphasized rapid implementation and "playability", such as fortune-drawing animations; v2 focuses more on code maintainability and user experience, with data structures refactored into strongly-typed objects and clear image-tag bindings, making it suitable for iterating more gameplay features. 