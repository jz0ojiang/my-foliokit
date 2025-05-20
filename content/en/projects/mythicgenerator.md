---
title: MythicGenerator - MythicMobs Config Generator
date: 2022-04-12
endDate: 2023-10-24
description: A MythicMobs plugin configuration generator, exploring desktop tool development with Wails and Tauri
cover: https://image.im0o.top/2025/202505201436933.png
tags:
  - Go
  - Vue
  - Tauri#FE7F2D
  - Desktop App#4A90E2
  - Minecraft#7FB069
link: https://github.com/jz0ojiang/mythicgenerator
abbrlink: 02e0ce1a
---

## Project Introduction

MythicGenerator is a visual tool for generating Minecraft plugin MythicMobs configurations. Users can configure item properties, enchantments, and other information through a graphical interface, exporting them as YAML files that meet plugin requirements, simplifying the configuration process. The project includes two implementation phases:

- ✅ **v1 (Completed)**: Cross-platform desktop application built with Wails + Go;
- 🚧 **v2 (Development Halted)**: Modern refactored version based on Tauri + Vue3 + TypeScript.

## v1: Wails Desktop Version

![](https://image.im0o.top/2025/202505201434886.png)

### 🛠 Tech Stack

- Backend: **Golang + SQLite**, using GORM for database operations
- Framework: **[Wails](https://wails.io/)**, implementing desktop application with frontend-backend integration
- Frontend: **Vue 3 + Vite**, using `<script setup>` single-file components

### ✨ Features

- **Item Data Management**: Support for adding, editing, deleting, and querying, covering properties, enchantments, descriptions, and other fields;
- **Data Persistence**: Using SQLite local database;
- **YAML Export**: Direct generation of configurations required by MythicMobs plugin;
- **Cross-platform Support**: Windows / macOS build support;
- **Efficient Communication**: Wails implementation of data bridging between Go and frontend.

### 📂 Directory Structure

- `main.go`: Application entry point
- `app.go`: Business logic processing
- `functions.go`: Data operations and export functionality
- `frontend/`: Vue frontend pages and components

### ✨ Screenshots

![](https://image.im0o.top/2025/202505201435720.png)

![](https://image.im0o.top/2025/202505201435516.png)

![](https://image.im0o.top/2025/202505201436619.png)

![](https://image.im0o.top/2025/202505201436988.png)

![](https://image.im0o.top/2025/202505201436237.png)

![](https://image.im0o.top/2025/202505201436646.png)

![](https://image.im0o.top/2025/202505201436933.png)

## v2: Tauri + Vue3 Refactored Version (Halted)

### 🎯 Refactoring Goals

To improve UI performance and extensibility, attempted to use the lighter Tauri framework, combined with Vue 3 and TypeScript to implement a modular drag-and-drop component system.

### ✨ Drag-and-Drop Implementation

- Using `vuedraggable` for component cloning and dragging;
- Support for locking source components to prevent duplicate additions;
- Drag animation and custom placeholder styles enhancing interaction experience;
- Clear component structure separation, supporting independent modules for properties, display, and colors.

```ts
const siderlist = [
  {
    id: 0,
    name: "Home",
    component: null,
    locked: ref(true),
  },
  ...
];
```

### 🧪 Technical Highlights

* Type-safe TypeScript + Vue3 Composition API
* Using Naive UI to build responsive interface with dark theme support
* Visual color code input with real-time preview (supporting `<gradient>` / `<rainbow>` tags)
* Disabled right-click menu, custom drag feedback, and other detail optimizations

---

## 📌 Project Status

MythicGenerator v1 has been completed as a fully functional tool with practical value. The v2 version, while exploring Tauri desktop development solutions, component systems, and interaction design, completed the drag-and-drop system and UI construction, but development was halted for the following reasons:

* 🔻 Declining MythicMobs community activity (MCBBS community closure);
* 🎓 Personal graduation project phase, insufficient development time;
* 🎯 Comprehensive evaluation leading to prioritization of more valuable project directions.

Although v2 was not ultimately implemented, the experience gained in component design, drag-and-drop systems, and TypeScript practices during this refactoring provided a solid technical foundation for future projects.

## 🎞️ Project Demo

### Drag-and-Drop Example

![](https://image.im0o.top/2025/202505201432394.gif)

<figcaption>v2 supports dragging components from sidebar to editing area with locking, demonstrating modular design approach</figcaption>

### Color Character Rendering

![](https://image.im0o.top/2025/202505201433100.gif)

## 🔚 Conclusion

MythicGenerator is a comprehensive project combining desktop development, visual configuration generation, and actual plugin requirements. Its two phases respectively demonstrate:

* **v1's Practicality**: Quick tool formation and actual implementation;
* **v2's Exploratory Nature**: Architectural experimentation for modern UI/UX.

Even though maintenance was not continued, it demonstrates technical and project judgment in proactive refactoring and rational decision-making to cut losses. 