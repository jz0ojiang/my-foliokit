---
title: hexo-generator-index-custom
date: 2022-08-21
description: 支持置顶与隐藏文章的 Hexo 首页生成器插件 # optional ; 可选项
cover: https://image.im0o.top/2022/20220821033435.png # optional ; 可选项
tags:
  - JavaScript
  - Hexo
  - NPM#FF6B6B
link: https://github.com/im0o/hexo-generator-index-custom
abbrlink: 7a96720e
---

<!-- 项目正文内容，可支持 Markdown 格式 / Project content below, supports Markdown format -->

## 项目介绍

`hexo-generator-index-custom` 是一个基于 Hexo 官方首页生成器的定制插件，新增了两个常用功能：

- `top` 和 `sticky`：支持通过 front-matter 控制文章置顶；
- `hide`: 支持隐藏指定文章，不渲染在首页中。

为适配主流主题（如 Butterfly），插件优先读取 `top` 字段，并兼容 `sticky`；隐藏文章时也能避免占用首页分页。

## 技术实现

- 使用 Hexo 的 `generator` 扩展生命周期，接管 `index` 页逻辑；
- 自主实现置顶排序规则（支持 `top` 和 `sticky` 优先级）；
- 利用 front-matter 自定义字段控制文章是否渲染；
- 发布至 [npm](https://www.npmjs.com/package/hexo-generator-index-custom)，支持独立安装与配置。

## 对比已有方案

| 插件/方法                     | 置顶文章 | 隐藏文章 | 特点说明 |
|------------------------------|----------|----------|----------|
| hexo-generator-index-pin-top | ✅       | ❌       | 不支持隐藏，排序不可配置 |
| hexo-generator-index2        | ❌       | ✅       | 通过 tag 控制隐藏，置顶较繁琐 |
| 官方 hexo-generator-index    | ✅（支持 sticky）| ❌  | 不支持 top 属性，兼容性较差 |
| 🟢 本插件                    | ✅（top/sticky） | ✅       | 同时支持 top 和 hide，主题兼容性强 |
