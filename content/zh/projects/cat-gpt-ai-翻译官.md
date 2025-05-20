---
title: CatGPT - ai 翻译官
date: 2024-06-20
description: 一个基于 GPT 的智能翻译工具
cover: https://image.im0o.top/2025/202505191953454.png
tags:
  - Python
  - webview#70B44D
  - Vue
  - AI
link: https://github.com/jz0ojiang/ai-translator # optional ; 可选项
abbrlink: 8f69cf2f
---

# CatGPT - AI 翻译官

## 🎬 视频演示

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV1paERzREZC&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>

## 项目简介

**CatGPT** 是一个结合 GPT 与 DeepL 的桌面级智能翻译工具，支持 GUI 与 CLI 双模式，适用于日常翻译、学习辅助、开发集成等多种场景。项目使用 Python + Vue 构建，具备轻量、易用、响应迅速等特点。

![演示截图](https://image.im0o.top/2025/202505191955989.png)

## ✨ 项目特性

* 🤖 **多引擎翻译支持**：集成 OpenAI GPT 与 DeepL API，兼顾创意与准确性；
* 🧠 **智能语言检测**：自动识别源语言，无需手动选择；
* 🖥 **图形界面支持**：通过 WebView 提供跨平台桌面 GUI；
* 🧑‍💻 **命令行模式**：适合终端用户或脚本集成使用；
* ⚙️ **灵活配置**：支持通过 `.env` 或命令行传参配置 API 密钥、地址等。

## 🧱 技术栈

* **后端**：Python 3.8+

  * `openai`, `translate`, `langdetect`, `argparse`, `dotenv`, `pywebview`
* **前端**：Vue + TypeScript + Vite

  * 使用 `pnpm` 管理依赖，构建速度快，界面响应流畅
* **架构特点**：前后端分离，类模块封装、支持参数化运行

## 📦 使用方式

```bash
# GUI 模式
python app.py

# CLI 模式
python app.py --nogui
```

支持命令行传参：

* `--key` 指定 API Key
* `--gptaddr` 设置自定义 GPT 接口地址
* `--debug` 开启调试日志
* `--native` 使用原生控件模式

## 🔒 安全策略

* 所有敏感配置（如 API 密钥）使用 `.env` 管理
* 不默认携带任何密钥信息，确保部署安全

## 📝 项目状态

目前功能完整，已完成第一阶段迭代。后续将考虑：

* 增加翻译历史记录与批量翻译支持
* 支持其他 AI 模型接入
* GUI 多语言支持

## 📎 项目地址

[🔗 GitHub 仓库](https://github.com/jz0ojiang/ai-translator)
