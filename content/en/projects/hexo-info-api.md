---
title: hexo-info-api
date: 2022-09-06
description: A Hexo plugin that adds API support with CORS and interface configuration options
cover: https://image.im0o.top/2022/202209061913881.png
tags:
  - JavaScript
  - Hexo
  - NPM#FF6B6B
link: https://github.com/jz0ojiang/hexo-info-api
abbrlink: 1f516f00
---

## Project Introduction

`hexo-info-api` is an API plugin designed for Hexo blog static sites. It implements API functionality by generating JSON files and registering middleware, supporting custom interface enabling and cross-origin access settings. It's suitable for scenarios like site search and site statistics.

- 🔁 Outputs structured API interfaces through `hexo.extend.generator`
- 🌍 Registers `server_middleware` to support CORS settings, enabling cross-origin access
- 🧩 Supports user-defined interface extensions, adaptable to any frontend logic
- 🧱 Includes 10+ built-in common interfaces by default (e.g., post list, tags, categories, latest posts)

## Technical Highlights

- Leverages Hexo's lifecycle registration system to build API routes;
- Uses `senchalabs/connect` middleware to add CORS support to Hexo Server;
- Interfaces are organized in modules, enabling/disabling through configuration, enhancing plugin maintainability and extensibility;
- Simulates a "backend API layer" in Hexo, providing frontend-backend decoupling capabilities for static blogs.

## Example Interfaces

- `GET /api/getPosts`: Get post list
- `GET /api/getPostByPath/:path`: Get specific post content by path
- `GET /api/getCategories` / `getTags`: Get site-wide categories and tags
- `GET /api/getLatestPost`: Get the most recent post

📦 [npm package link](https://www.npmjs.com/package/hexo-info-api)

📄 [Development blog post](https://blog.im0o.top/posts/d3bc8dff.html) 