---
title: DESU.Life Official Website Development
date: 2023-09-01
description: A studio official website supporting multilingual switching, responsive layout, and focusing on extreme loading performance and user experience.
endDate: present
cover: https://image.im0o.top/2025/202506071444788.png
tags:
  - Vue
  - Vite
  - TypeScript
  - i18n#4A90E2
  - CI/CD#2ECC71
  - Frontend Optimization#F49D37
link: https://github.com/desu-life/desu-life
top: false
draft: false
weight: 5
no_ai: false
abbrlink: 8f5d2e1a
---

DESU.Life is an official website supporting multilingual switching, responsive layout, and focusing on extreme loading performance and user experience. This project is built with Vue3 + Vite + TypeScript, focusing on content presentation, speed optimization, and development experience improvement.

I led the development from the project's inception, covering UI design implementation, performance optimization, component architecture, internationalization support, and CI/CD processes.

---

## 💡 Project Highlights & Technical Implementation

### 📦 Font & Resource Optimization
- Used [subset processing](https://blog.im0o.top/posts/e1035436.html) to streamline page fonts, keeping file size under 10KB, avoiding loading the entire CJK font set causing lag;
- All images converted to WebP format, combined with lazy loading and progressive loading for maximum user loading experience;
- Enabled gzip and disabled `no-compress` static rules through [Nginx configuration optimization](https://blog.im0o.top/posts/a967f839.html).

### 🖼️ Progressive Image Loading
- Implemented image components through TSX rendering, using `<img srcset>` to simulate progressive behavior;
- Added error fallback logic, placeholder support, and SSR compatibility;
- Implementation reference: [Implementing Progressive Loading](https://blog.im0o.top/posts/116723d.html), [Image Lazy Loading](https://blog.im0o.top/posts/bf087cd4.html).

### ⚡ Async Components + First Screen Loading Speed
- First screen content introduced through skeleton screens and `defineAsyncComponent`, improving perceived performance;
- First screen loading time reduced from **6 seconds to 2 seconds**;
- Technical analysis details: [First Screen Loading Optimization](https://blog.im0o.top/posts/6317b38a.html).

### 🌍 Internationalization (i18n) Support
- Established translation workflow using `vue-i18n` + Gitlocalize, supporting Chinese, English, Japanese, and Korean;
- All page content supports dynamic language switching, with HTML lang attribute set for improved SEO and accessibility;
- Translation resource structure decoupled from components, supporting multi-site shared translation files.

### 🔁 CI/CD Automated Deployment & Authentication
- Implemented automated release process based on GitHub Actions:
  - Trigger build and deployment after pushing `release` version;
  - Automatically upload artifacts to server and update version status;
- Used [Timestamp-based HMAC Dynamic Authentication](https://blog.im0o.top/posts/29f324f.html) to protect deployment interface;
- Combined with [Semantic Commit Specification](https://blog.im0o.top/posts/31eaaef6.html) for automatic version number determination and Changelog generation.

### 🧱 Component Modularization & Maintainability
- Used TSX to write highly reusable components such as image cards and interactive buttons;
- Separated and encapsulated modules like `Device`, `DefaultModal`, `Footer`, `SEOBlock`, improving reusability and logical independence;
- Supported named imports, alias paths (@ => src), optimizing development experience.

---

## 🔗 Project Links
- Source Code: [github.com/desu-life/desu-life](https://github.com/desu-life/desu-life)
- Website: [desu.life](https://desu.life)

---

## 📖 Further Reading
- [Implementing Progressive Image Loading with Vue + TSX](https://blog.im0o.top/posts/116723d.html)
- [Character Subsetting: Frontend Project Optimization (1)](https://blog.im0o.top/posts/e1035436.html)
- [Gzip Compression: Frontend Project Optimization (2)](https://blog.im0o.top/posts/a967f839.html)
- [Image Lazy Loading: Frontend Project Optimization (3)](https://blog.im0o.top/posts/bf087cd4.html)
- [Using Async Components to Improve First Screen Loading Speed (4)](https://blog.im0o.top/posts/6317b38a.html)
- [Implementing One-Time Deployment Authentication with Timestamps and HMAC](https://blog.im0o.top/posts/29f324f.html)
- [Automatic Version Release with GitHub Actions + Semantic Commits](https://blog.im0o.top/posts/31eaaef6.html) 