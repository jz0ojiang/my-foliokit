---
title: Bible Puzzle - The Believer
date: 2022-08-19
description: A Lovecraftian-style text puzzle game combining QR code puzzles, cipher decoding, and audio decryption gameplay
cover: https://image.im0o.top/2022/20220819084204.png
tags:
  - Vue
  - TypeScript
  - Puzzle Game#FF6B6B
  - Interaction Design#4834D4
  - Multimedia#26DE81
abbrlink: cd56e50d
weight: 4
---

![](https://image.im0o.top/2025/202505181008520.png)

## Project Introduction

"Bible Puzzle - The Believer" is a Lovecraftian-style web puzzle game where players take on the role of the legendary adventurer Oye Gand, navigating through mysterious clues and ultimately uncovering the truth hidden within religious mysticism.

This project is the predecessor to "Oldtown Puzzle". Despite its short development cycle and minimalist interface, it represents a series of exploratory attempts in gameplay design and component systems, serving as an H5 puzzle experiment in multimodal information integration.

## Gameplay Flow

- 📰 **Newspaper Puzzle Introduction**  
  Players identify clues by reading the "Book of Old Days" newspaper, triggering the puzzle-solving process;

- 🧩 **QR Code Puzzle**  
  Players must manually reassemble torn QR codes to scan and access subsequent content;

- 🐍 **Cipher Poetry Decryption**  
  The game features folded "Beast's Call" cipher text, requiring restoration from both visual and semantic perspectives;

- 🔊 **Audio Morse Code Recognition**  
  At certain stages, Morse code is transmitted through embedded video content, which players must translate into text passwords;

- 🏁 **Ending Easter Egg and Verification**  
  Upon decryption, players receive a unique verification code and trigger ending text, completing the settlement.

## Technical Implementation

- Developed SPA using Vue3 + TypeScript;
- Implemented embedded video playback using `vue3-player-video`;
- Configured multi-page flow navigation with Vue Router;
- Modularized each puzzle component for independent development and testing;
- Used `localStorage` to preserve user progress state;
- Deployed to Vercel for easy QR code access and public display.

## Project Highlights

- Integrated multimodal puzzle design combining text, QR codes, images, and audio;
- Explored frontend capabilities in driving "puzzle-solving processes";
- Clearly targeted "low-resource + rapid development" with an extremely short implementation cycle;
- Provided foundational structural design reference for the subsequent "Oldtown Puzzle" development.

📄 [Development blog post](https://blog.im0o.top/posts/98b6ab63.html) 