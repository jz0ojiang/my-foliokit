---
title: Oldtown Puzzle
date: 2022-08-19
description: A dialogue-driven interactive puzzle game combining input, drag-and-drop, and mechanism interactions, implemented purely in frontend
cover: https://image.im0o.top/2022/20220819101914.png
tags:
  - Vue
  - TypeScript
  - H5 Game#FF9F43
  - Puzzle Design#4834D4
  - Componentization#26DE81
link: https://oldtown.oh.ac.cn/
abbrlink: ef5fd207
---

## Project Introduction

Oldtown Puzzle is a web-based puzzle game developed with Vue3 + TypeScript, presented in a visual novel style. It guides players through solving puzzles embedded in the storyline, ultimately leading to an easter egg upon completion.

The game was customized for an offline event, supporting instant play via QR code scanning. The entire gameplay flow is implemented purely with frontend logic, deployed on Vercel, and optimized for both mobile and desktop browsing experiences.

## Core Gameplay

- 💬 **Dialogue-driven Story Progression**: Presents the story rhythm in WeChat-style chat bubbles, immersing players in the narrative;
- 🧩 **Puzzle Design**:
  - Bagua diagram drag-and-drop sorting (implemented with Vue Draggable);
  - Text-based poetry completion puzzles;
  - Nine-character mantra hand seal sequence clicking mechanism;
- 📜 **Storyline Easter Eggs**: Final code input triggers the easter egg and completion verification.

## Technical Implementation

- Built SPA using Vue3 + TypeScript;
- `speech/*.vue` implements five types of message components (button, input, player, NPC, system);
- Uses `Vuex + Storage` for global progress management and basic anti-cheat detection;
- Implements drag-and-drop layout using CSS Grid, enhanced with animations and smooth scrolling for better UX;
- Uses `onUpdated` for automatic message scrolling to bottom;
- Custom scrollbar styling, compatible with Chrome and Firefox.

## Project Screenshots

![](https://image.im0o.top/2024/202505181005626.png)
> Dialogue bubble system (click anywhere to continue)

![](https://image.im0o.top/2024/202505181005099.png)
> Drag stone slabs to restore Bagua sequence

![](https://image.im0o.top/2025/202505181005665.png)
> Enter correct keywords to advance the story

![](https://image.im0o.top/2025/202505181006702.png)
> Nine-character mantra sequence mechanism, auto-fail on wrong input

![](https://image.im0o.top/2025/202505181006472.png)
> Enter code to unlock ending easter egg

## Key Highlights

- Well-designed component architecture with high reusability;
- Innovative fusion of narrative and puzzle-solving;
- Integrated Storage for state persistence and exception handling, enhancing user feedback;
- Fully frontend-driven process, demonstrating high independence and expressiveness.

---

📄 [Development blog post](https://blog.im0o.top/posts/abfffc1b.html) 