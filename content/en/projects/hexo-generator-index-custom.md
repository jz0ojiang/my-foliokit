---
title: hexo-generator-index-custom
date: 2022-08-21
description: A Hexo index generator plugin supporting pinned and hidden posts
cover: https://image.im0o.top/2022/20220821033435.png
tags:
  - JavaScript
  - Hexo
  - NPM#FF6B6B
link: https://github.com/im0o/hexo-generator-index-custom
abbrlink: 8b97831f
---

## Project Introduction

`hexo-generator-index-custom` is a customized plugin based on the official Hexo index generator, adding two commonly used features:

- `top` and `sticky`: Support article pinning through front-matter;
- `hide`: Support hiding specific articles from the homepage.

To adapt to mainstream themes (such as Butterfly), the plugin prioritizes reading the `top` field while maintaining compatibility with `sticky`; it also prevents hidden articles from occupying homepage pagination.

## Technical Implementation

- Uses Hexo's `generator` extension lifecycle to take over `index` page logic;
- Implements custom pinning sorting rules (supports `top` and `sticky` priority);
- Utilizes front-matter custom fields to control article rendering;
- Published to [npm](https://www.npmjs.com/package/hexo-generator-index-custom), supporting independent installation and configuration.

## Comparison with Existing Solutions

| Plugin/Method                | Pinned Posts | Hidden Posts | Features |
|------------------------------|--------------|--------------|----------|
| hexo-generator-index-pin-top | ✅           | ❌           | No hiding support, sorting not configurable |
| hexo-generator-index2        | ❌           | ✅           | Controls hiding via tags, pinning is cumbersome |
| Official hexo-generator-index| ✅ (sticky)  | ❌           | No top property support, poor compatibility |
| 🟢 This Plugin              | ✅ (top/sticky)| ✅         | Supports both top and hide, strong theme compatibility | 