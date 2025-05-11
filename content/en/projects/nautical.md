---
title: Nautical
date: 2022-03-11
description: Pixel-style maritime trading game with map editor and event system, featuring resource management, modular architecture, and economic simulation
cover: https://image.im0o.top/2024/202505111557911.webp
tags:
  - Pygame#70B44D
  - Python
  - Maritime Simulation#3B80C2
  - Pixel Art#D16F9E
link: https://github.com/jz0ojiang/nautical
top: false
draft: false
weight: 5
no_ai: false
abbrlink: 5af9371f
---

<!-- Project content below, supports Markdown format -->

> `Nautical` is an independently developed pixel-style maritime trading game based on Python + Pygame, featuring a map editor, custom event system, resource management, and dynamic trading. The project covers interactive UI component encapsulation, modular page structure, resource management, and system-level data configuration, suitable for course demonstrations, independent game development, or system architecture presentations.

---

## 🎬 Video Demo

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV1YgEuzGEY1&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>

---

## 🧭 Gameplay Overview

- Players start with initial funds to purchase ships and configure supplies
- Navigate between multiple ports for trading
- Ship attributes determine game strategy (speed, durability, capacity)
- Random events during voyages: pirates, storms, salvage opportunities
- Victory achieved by reaching target profit, shipwreck leads to game over

---

## 🛠️ Core Mechanics & Modules

| Module | Description |
|--------|-------------|
| **Map System** | Custom map format supporting route configuration, spawn points, merchant stations |
| **Event System** | Maritime events like pirate attacks, supplies, storm damage, loaded from JSON data |
| **Interaction System** | Encapsulated component interaction model, all click events support registration and unbinding |
| **Ship Management** | Different ship types with varying capacity/speed/price affecting strategy |
| **Items & Merchant System** | Merchants with independent inventory and pricing, supporting three-port price differential trading |
| **Resource System** | Local loading of images, audio, and fonts for easy packaging and cross-platform migration |

---

## 🧱 Project Structure

![Game Architecture](https://image.im0o.top/2024/202505111601693.jpg)

The project uses a modular structure, dividing into page layer, component layer, data layer, and resource layer, ensuring clear module responsibilities and easy maintenance.

---

## 🎨 Art & Interaction Design

- All interfaces based on pixel art style, with unified icon and font treatment
- UI dynamically responds to interactions, with custom-encapsulated menus, popups, and value displays
- Interactive prototypes designed in `Adobe XD`, implemented with `pygame` for UI animations and transitions
- Enhanced visual hierarchy through background scrolling and floating icons

---

## 💡 Technical Highlights

- 📦 Map and game logic completely decoupled, resources replaceable via editor export
- 🎲 Events and data controlled by configuration files for quick expansion or value adjustment
- 🧩 All interface modules support state reset and state transition, clean page switching
- 🛠️ Provides `.exe` version for local running

---

## 🔗 Project Links

- GitHub Source: [github.com/jz0ojiang/nautical](https://github.com/jz0ojiang/nautical)

---

> Nautical, as an independently designed and developed pixel-style maritime game, achieves good completeness in gameplay design, system expansion, and code organization. The introduction of map editor and event system enhances replayability and freedom. The project holds triple value for teaching, demonstration, and game prototyping, having been applied in graduation projects, course presentations, and portfolio showcases. 