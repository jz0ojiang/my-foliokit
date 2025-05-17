---
title: FolioKit
date: 2025-04-15
description: AI-powered portfolio generator with semantic Q&A and multilingual content display
endDate: present
cover: https://image.im0o.top/2024/202505140042605.png
tags:
  - FolioKit
  - Nuxt
  - Python
  - Flask#3B80C2
  - AI
link: https://github.com/jz0ojiang/Foliokit
top: true
weight: 5
abbrlink: 8105cace
---

> Content summarized by ChatGPT, may have a strong AI flavor \:D

FolioKit is a modern portfolio generator designed for developers. It features a frontend-backend separated architecture, with Nuxt3 for the frontend and Flask for API services. The project integrates AI capabilities, supporting semantic search and intelligent Q&A, making project showcases more engaging and interactive.

## 🎯 Core Features

## 🧩 Project Structure Overview

* Frontend: Nuxt3, TypeScript, TailwindCSS, Nuxt Content, i18n, GitHub Actions
* Backend: Flask, LlamaIndex, OpenAI API, local JSON vector storage
* Deployment: Frontend on Vercel, backend in Linux container with Nginx proxy

## 💭 Why Build This?

I had too many projects, and writing blog posts wasn't getting much attention. Individual project introductions felt scattered. I wanted a more systematic platform that could showcase projects and answer questions intelligently. Existing solutions like linktree/bento felt too limited, so I built my own.

## 🎨 Design Philosophy

The page is minimal, without navigation. Just a hello animation and search box. I've hidden the "About Me" section under a small link below the search box.

Projects are displayed as cards, with a prompt to view the full list after a few loads. Dark mode only - because I prefer it, no light mode implemented.

Responsive design relies on flexbox, minimal media queries. Detail pages evolved from card style to flat design for simplicity.

## 🛠 Frontend Development Details

* SSR mode disabled by default. Initially planned to use Nuxt for full-stack, but LlamaIndex proved slow and unstable in serverless environments, so switched to API separation

* GitHub Actions for automatic deployment, smooth CI/CD pipeline with Vercel integration

* Project data written in Markdown with frontmatter managing metadata

* Support for tag#hex color settings directly in frontmatter

* Tailwind with @apply for SCSS, avoiding excessive inline classes

* Font subsetting with font/font-full loading modes for optimized experience

* Custom directory structure with everything in src, some Nuxt plugins remain in root

* SSR disabled due to LlamaIndex cold start issues in serverless environment

## 🤖 AI Collaboration

This project was written in Cursor IDE with a paid subscription. The AI assistant helped with documentation lookup and Tailwind configuration, far more convenient than a command-line AI assistant.

I realized: AI isn't just a code completion tool, it should be a structure-aware dialogue collaborator. Cursor aligns well with this vision.

## 🔧 Backend (foliokit-api)

All foliokit-api parameters are configurable via `.env`, including model type (supports DeepSeek etc.), OpenAI Key, Redis address. If Redis is not configured, caching logic is automatically skipped.

Flask project structure uses factory function + Blueprint modular organization for maintainability and extensibility.

Built with Flask for lightweight implementation. Initially started as a LlamaIndex demo, evolved into a full service.

Features include:

* Local JSON vector storage for project content and structure
* OpenAI API integration (can be switched to DeepSeek via .env)
* Optional Redis support, disabled if not configured
* Deployment with gunicorn + nginx + HTTPS

## 🧠 Prompt Engineering

Prompt system has language-specific system prompts, e.g., "Always respond in English" for English, "Don't fabricate content" for Chinese.

Custom XML-wrapped JSON prompt structure:

```xml
<msg_json>
{
  "user_message": "...",
  "message_info": "...",
  "requirements": [...]
}
</msg_json>
```

This prevents prompt injection. I've tested the API with aggressive prompt attacks, attempting to cause "personality confusion" or generate strange content - successfully blocked most attack prompts.

Prompts also have language-specific system templates, including rules like "no content fabrication" and "prioritize context-based responses".

## 🔁 Response Mechanism

* Enabled OpenAI's streaming output for real-time text loading
* Falls back to full content search when no vector matches found, ensuring users don't get empty responses

## 🔧 Deployment Configuration & Extensibility

Model selection, caching, and other parameters controlled via `.env` for easy migration. Clear deployment logic, future plans include registration system with plan tiers and permission control.

> *Of course, these are just ideas, not implemented yet.*

## 🎨 UI Details

Initial sketches in Pixso weren't followed exactly, with many changes during implementation. However, overall color scheme and structural direction remained consistent.

Tag color management unified in tag.css for clear semantics and easy modification.

## ✅ Summary

FolioKit is a project I built for personal use, hoping others would think "so this is how portfolios can be done."

It represents an exploration of "AI + content platform" structure: projects aren't just passively displayed, but can be questioned, understood, and reorganized. 