---
title: CatGPT - AI Translator
date: 2024-06-20
description: An intelligent translation tool based on GPT
cover: https://image.im0o.top/2025/202505191953454.png
tags:
  - Python
  - webview#70B44D
  - Vue
  - AI
link: https://github.com/jz0ojiang/ai-translator
abbrlink: 9f7adf40
---

# CatGPT - AI Translator

## 🎬 Video Demo

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV1paERzREZC&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>

## Project Introduction

**CatGPT** is a desktop-level intelligent translation tool that combines GPT and DeepL, supporting both GUI and CLI modes. It's suitable for various scenarios including daily translation, learning assistance, and development integration. Built with Python + Vue, the project features lightweight design, ease of use, and rapid response.

![Demo Screenshot](https://image.im0o.top/2025/202505191955989.png)

## ✨ Features

* 🤖 **Multi-engine Translation Support**: Integrates OpenAI GPT and DeepL API, balancing creativity and accuracy;
* 🧠 **Intelligent Language Detection**: Automatically detects source language without manual selection;
* 🖥 **Graphical Interface Support**: Provides cross-platform desktop GUI through WebView;
* 🧑‍💻 **Command Line Mode**: Suitable for terminal users or script integration;
* ⚙️ **Flexible Configuration**: Supports API keys, addresses, and other settings via `.env` or command line parameters.

## 🧱 Tech Stack

* **Backend**: Python 3.8+

  * `openai`, `translate`, `langdetect`, `argparse`, `dotenv`, `pywebview`
* **Frontend**: Vue + TypeScript + Vite

  * Uses `pnpm` for dependency management, featuring fast builds and smooth interface response
* **Architecture**: Frontend-backend separation, modular encapsulation, parameterized operation support

## 📦 Usage

```bash
# GUI Mode
python app.py

# CLI Mode
python app.py --nogui
```

Command line parameters supported:

* `--key` Specify API Key
* `--gptaddr` Set custom GPT interface address
* `--debug` Enable debug logging
* `--native` Use native control mode

## 🔒 Security Strategy

* All sensitive configurations (such as API keys) managed through `.env`
* No default key information included, ensuring deployment security

## 📝 Project Status

Currently feature-complete, first phase iteration completed. Future considerations include:

* Adding translation history and batch translation support
* Supporting additional AI model integration
* GUI multi-language support

## 📎 Project Links

[🔗 GitHub Repository](https://github.com/jz0ojiang/ai-translator) 