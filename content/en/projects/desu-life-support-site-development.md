---
title: DESU.Life Support Site Development
date: 2025-05-24
description: A studio support site focused on extreme loading performance and user experience.
endDate: present
cover: https://image.im0o.top/2025/202506071520165.png
tags:
  - Astro#2ECC71
  - Svelte
  - SSG#F49D37
  - CI/CD#4A90E2
  - UI Design#F49D37
  - SEO#2ECC71
link: https://github.com/desu-life/support-desu-life
top: false
draft: false
weight: 5
no_ai: false
abbrlink: 7b2c9e4f
---

**DESU.Life Support** is a support and download service sub-site for the DESU.Life project, primarily serving device users with configuration downloads, manuals, installation guides, and technical documentation. I independently handled the **UI design and frontend development** of this site, focusing on extreme performance, accessibility, and clear information architecture.

---

## 🚀 Performance & Optimization Highlights

- Implemented full static site generation (SSG) using Astro, combined with Nginx gzip compression, significantly reducing load times;
- Optimized performance scores to **100/100 (both mobile and desktop)** using [PageSpeed Insights](https://pagespeed.web.dev/);
- Remaining optimization items are only minor image compression suggestions (about 60KB) and some accessibility tags, **not affecting the perfect score**;
- SEO optimization using Screaming Frog SEO Spider for dead link checking and structure optimization, combined with manual `robots.txt` writing and automatic `sitemap.xml` generation.

![](https://image.im0o.top/2025/202506071517189.png)

![](https://image.im0o.top/2025/202506071518553.png)

---

## 🎨 UI & Component Architecture

- Full site UI designed and implemented by me, supporting dark mode and responsive layout;
- Components include: Dropdown, Drawer, DownloadBanner, SearchContent, IconLabel, Note, Product, etc.;
- Content structure rendered through markdownX, using unified `.mdx` scaffold files (`scaffold/`) to control layout and cover styles.

![](https://image.im0o.top/2025/202506071519036.png)

---

## ⚙️ Automated Deployment & Semantic Release

- Configured GitHub Actions for automated build and deployment (located in `.github/workflows/build-and-deploy.yml`);
- Using semantic commits (Conventional Commits) as trigger conditions, automatically distinguishing between regular updates and version releases;
- Combined with HMAC timestamp mechanism to ensure build interface deployment security, see related blog posts:
  - [Implementing One-Time Passwords with Timestamps and HMAC](https://blog.im0o.top/posts/29f324f.html)
  - [Semantic Commits Driven Automatic Version Release](https://blog.im0o.top/posts/31eaaef6.html)

---

## 📦 Project Structure Overview (Partial)

```text
├── public/
│   ├── images/[devices, posts, products]/
│   └── robots.txt
├── scaffold/                   ← Custom content templates
├── src/
│   ├── components/             ← Common components + Markdown Block
│   ├── content/[firmware, posts, products, terms]/
│   ├── pages/                  ← Astro page entries (supports routing)
│   ├── utils/                  ← Utility functions (e.g., MDX extraction)
│   └── assets/css/            ← Tailwind, main color system, etc.
├── .github/workflows/         ← Automated deployment CI process
├── svelte.config.js, astro.config.mjs
```

---

## 🔗 Project Links

* Live Demo: [support.desu.life](https://support.desu.life/)
* GitHub Source: [github.com/desu-life/support-desu-life](https://github.com/desu-life/support-desu-life) 